import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import { ConfirmationComponentProps } from './BaseConfirmationModal';

const DEFAULT_TITLE = 'Esta seguro que quiere continuar con la operación?';
const DEFAULT_BODY = 'Esta acción no se puede revertir';

export type ConfirmationModalProps = ConfirmationComponentProps & {
    title: string;
    bodyText: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    giveAnswer,
    ...props
}) => {
    const title = props.title || DEFAULT_TITLE;
    const bodyText = props.bodyText || DEFAULT_BODY;

    return (
        <Dialog open={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {bodyText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => giveAnswer(false)} color="primary">
                    Cancelar
                </Button>
                <Button
                    startIcon={<CheckIcon />}
                    onClick={() => giveAnswer(true)}
                    color="primary"
                    autoFocus
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
