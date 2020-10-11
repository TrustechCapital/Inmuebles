import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { OperacionesCatalogo } from '../constants';
import SavingButton from './SavingButton';
import ErrorMessage from './ErrorMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function getTitle(
    operacionCatalogo: OperacionesCatalogo,
    nombreCatalogo: string
): string {
    switch (operacionCatalogo) {
        case OperacionesCatalogo.Alta:
            return `Alta de ${nombreCatalogo}`;
        case OperacionesCatalogo.Modificacion:
            return `Modificación de ${nombreCatalogo}`;
        case OperacionesCatalogo.Consulta:
            return `Consulta de ${nombreCatalogo}`;
        default:
            return '';
    }
}

type CatalogDialogProps = {
    operacionCatalogo: OperacionesCatalogo;
    nombreCatalogo: string;
    subtitle: string;
    onCancel: () => void;
    onAccept: () => void;
    opened: boolean;
    errorMessage: string | null;
    saving: boolean;
    success: boolean;
};

const CatalogDialog: React.FC<CatalogDialogProps> = ({
    operacionCatalogo,
    nombreCatalogo,
    subtitle,
    onCancel,
    onAccept,
    opened,
    children,
    errorMessage,
    saving,
    success,
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(opened);
    }, [opened]);

    const classes = useStyles();
    let title = getTitle(operacionCatalogo, nombreCatalogo);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth="md"
            onClose={onCancel}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{subtitle}</DialogContentText>
                <form className={classes.root} noValidate autoComplete="off">
                    {children}
                </form>
            </DialogContent>
            <DialogActions>
                <ErrorMessage message={errorMessage}/>
                <Button onClick={onCancel} variant="contained">
                    Cancelar
                </Button>
                <SavingButton
                    onClick={onAccept}
                    loading={saving}
                    success={success}
                    disabled={
                        operacionCatalogo === OperacionesCatalogo.Consulta
                    }
                />
            </DialogActions>
        </Dialog>
    );
};

export default CatalogDialog;
