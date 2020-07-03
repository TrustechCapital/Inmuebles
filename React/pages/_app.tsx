import '../styles.css';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../sharedComponents/Layout';
import { catalogsApi } from '../core/api';
import SessionService from '../services/SessionService';
import Login from '../modules/Login/MainLogin';
import SessionInfo, { ModulePermission } from '../models/SessionInfo';
import BaseTheme from '../sharedComponents/BaseTheme';
import { SessionInfoContext } from '../core/LoginContext';

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

        catalogsApi.fetchAll().then(() => {
            const { sessionInfo, permissionsMap } = SessionService.get();
            setSessionInfo(sessionInfo);
            setModulePermissionsMap(permissionsMap);
            setLoadingApp(false);
        });
    }, []);

    function handleSuccessfulLogin() {
        const { sessionInfo, permissionsMap } = SessionService.get();
        setSessionInfo(sessionInfo);
        setModulePermissionsMap(permissionsMap);
        Router.push('/');
    }

    function handleLogout() {
        SessionService.delete();
        setSessionInfo(null);
        Router.push('/');
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
                    {sessionInfo ? (
                        <Layout>
                            {loadingApp ? (
                                'Cargando...'
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </Layout>
                    ) : (
                        !loadingApp && <Login onLogin={handleSuccessfulLogin} />
                    )}
                </SessionInfoContext.Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
