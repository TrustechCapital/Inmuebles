import { useSnackbar } from 'notistack';

function useGlobalNotification() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const alertSuccess = (messaje: string) => {
        enqueueSnackbar(messaje, { variant: 'success' });
    };

    const alertWarning = (messaje: string) => {
        enqueueSnackbar(messaje, { variant: 'warning' });
    };

    const alertError = (messaje: string) => {
        enqueueSnackbar(messaje, { variant: 'error' });
    };

    const alertInfo = (messaje: string) => {
        enqueueSnackbar(messaje, { variant: 'info' });
    };

    return {
        alertSuccess,
        alertWarning,
        alertError,
        alertInfo,
        closeTray: closeSnackbar,
    };
}

export { useGlobalNotification };
