import '../styles.css';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { catalogsApi } from '../core/api';
import SessionService from '../services/SessionService';
import Login from '../modules/Login/MainLogin';
import SessionInfo, { ModulePermission } from '../models/SessionInfo';
import BaseTheme from '../sharedComponents/BaseTheme';
import { SessionInfoContext } from '../core/LoginContext';
import LoginService from '../services/LoginService';
import { SnackbarProvider } from 'notistack';

function removeInjectedServerCss() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
        jssStyles.parentElement.removeChild(jssStyles);
    }
}

async function tryLogin (){
    try {
        const ssoSessionInfo = await LoginService.ssoLogin();
        if (!ssoSessionInfo) {
            return null;
        }
        return LoginService.login(ssoSessionInfo.user.username, '', true);
    } catch (err) {
        console.log('Login Error', err);
        return null;
    }
}

function App({ Component, pageProps }: AppProps) {
    const [loadingApp, setLoadingApp] = useState(true);
    const [modulePermissionsMap, setModulePermissionsMap] = useState<Map<
        string,
        ModulePermission
    > | null>(null);
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

    useEffect(() => {
        removeInjectedServerCss();
    
        tryLogin().then((ssoSessionInfo) => {
            if (!ssoSessionInfo) {
                return handleLogout(false);
            }
            
            SessionService.create(ssoSessionInfo);
            handleSuccessfulLogin(false);
        });

        catalogsApi.fetchAll().catch(() => {
            console.log('Catalogos incompletos')
        }).finally(() => {
            setLoadingApp(false);
        });

    }, []);

    function handleSuccessfulLogin(redirect = true) {
        const { sessionInfo, permissionsMap } = SessionService.get();
        setSessionInfo(sessionInfo);
        setModulePermissionsMap(permissionsMap);

        if (redirect) {
            Router.push('/');
        }
    }

    function handleLogout(redirect = true) {
        SessionService.delete();
        setSessionInfo(null);
        
        // Clear cookies
        document.cookie = 'accessData=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        if (redirect) {
            Router.push('/');
        }
    }

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={BaseTheme}>
                <SnackbarProvider maxSnack={3}>
                    <SessionInfoContext.Provider
                        value={{
                            sessionInfo: sessionInfo,
                            onLogout: handleLogout,
                            modulePermissionsMap: modulePermissionsMap,
                        }}
                    >
                        {loadingApp ? (
                            'Cargando...'
                        ) : (
                            sessionInfo ? <Component {...pageProps} /> : <Login onLogin={handleSuccessfulLogin} />
                        )}
                    </SessionInfoContext.Provider>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
