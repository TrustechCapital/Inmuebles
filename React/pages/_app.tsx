import '../styles.css';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { catalogsApi } from '../core/api';
import SessionService from '../services/SessionService';
import Login from '../modules/Login/MainLogin';
import SessionInfo, { ModulePermission } from '../models/SessionInfo';
import BaseTheme from '../sharedComponents/BaseTheme';
import { SessionInfoContext } from '../core/LoginContext';
import LoginService from '../services/LoginService';
import { SnackbarProvider } from 'notistack';
import Layout from '../sharedComponents/Layout';

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
        
        const userInfo = LoginService.login(ssoSessionInfo.user.username, '', true);
        await catalogsApi.fetchAll();

        return userInfo;
    } catch (err) {
        console.log('Login Error', err);
        return null;
    }
}

const useStyles = makeStyles({
    loadingMessage: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
    },
    loadingIcon: {
        marginRight: '1rem'
    }
});

function App({ Component, pageProps }: AppProps) {
    const classes = useStyles();
    const [modulePermissionsMap, setModulePermissionsMap] = useState<Map<
        string,
        ModulePermission
    > | null>(null);
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
    const [loadingApp, setLoadingApp] = useState(true);

    useEffect(() => {
        removeInjectedServerCss();
    
        tryLogin().then((ssoSessionInfo) => {
            if (!ssoSessionInfo) {
                setLoadingApp(false);
                return handleLogout(false);
            }
            
            SessionService.create(ssoSessionInfo);
            setLoadingApp(false);
            handleSuccessfulLogin(false);
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

    let component = (
        <Typography className={classes.loadingMessage} variant="subtitle1">
            <CircularProgress className={classes.loadingIcon} />
            Cargando, por favor espere...
        </Typography>
    );

    if (!loadingApp) {
        component = sessionInfo ? <Layout><Component {...pageProps} /></Layout> : <Login onLogin={handleSuccessfulLogin} />;
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
                        {component}
                    </SessionInfoContext.Provider>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
