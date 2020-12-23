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

function removeInjectedServerCss() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
        jssStyles.parentElement.removeChild(jssStyles);
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
    
        LoginService.ssoLogin().then((ssoSessionInfo) => {
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
        //document.cookie = '';
        
        if (redirect) {
            Router.push('/');
        }
    }

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={BaseTheme}>
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
            </ThemeProvider>
        </>
    );
}

export default App;
