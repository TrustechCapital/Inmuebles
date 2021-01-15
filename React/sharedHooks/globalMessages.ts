//import { useSnackbar } from 'notistack';

function useGlobalNotification() {
    //const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const alertSuccess = (message: string) => {
        //enqueueSnackbar(message, { variant: 'success' });
        console.log('alertSuccess: '+message);
    };

    const alertWarning = (message: string) => {
        //enqueueSnackbar(message, { variant: 'warning' });
        console.log('alertWarning: '+message);
    };

    const alertError = (message: string) => {
        //enqueueSnackbar(message, { variant: 'error' });
        console.log('alertError: '+message);
    };

    const alertInfo = (message: string) => {
        //enqueueSnackbar(message, { variant: 'info' });
        console.log('alertInfo: '+message);
    };

    const closeTray = (message: string) => {
        //enqueueSnackbar(message, { variant: 'info' });
        console.log('closeTray: '+message);
    };

    return {
        alertSuccess,
        alertWarning,
        alertError,
        alertInfo,
        closeTray,
        //closeTray: closeSnackbar,
    };
}

export { useGlobalNotification };
