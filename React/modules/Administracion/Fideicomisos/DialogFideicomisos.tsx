import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Fideicomiso from '../../../models/Fideicomiso';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericForm from '../../../sharedComponents/Forms';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';

const { FormTextField } = new GenericForm<Fideicomiso>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const FideicomisosFormValidator = new FormValidator<Fideicomiso>({
    id: ValidationHelpers.validateFideicomiso,
    nombre: ValidationHelpers.validateRequiredString('Nombre del fideicomiso'),
});

const DialogFideicomisos: React.FC<ICatalogDialog<Fideicomiso>> = ({
    mode,
    model,
    open,
    errorMessage,
    savingStatus,
    onClose,
    onSaveRequest,
}) => {
    const classes = useStyles();

    const allFieldsDisabled = mode === OperacionesCatalogo.Consulta;
    const pkFieldsDisabled =
        allFieldsDisabled || mode === OperacionesCatalogo.Modificacion;

    return (
        <Formik
            initialValues={model}
            onSubmit={onSaveRequest}
            enableReinitialize={true}
            validationSchema={FideicomisosFormValidator.validationSchema}
        >
            {(props) => (
                <CatalogDialog
                    opened={open}
                    operacionCatalogo={mode}
                    nombreCatalogo="Fideicomisos"
                    subtitle="Fideicomisos"
                    onCancel={() => {
                        props.resetForm();
                        onClose();
                    }}
                    onAccept={props.handleSubmit}
                    errorMessage={errorMessage}
                    saving={savingStatus === SavingStatus.Saving}
                    success={savingStatus === SavingStatus.Success}
                >
                    <Grid
                        container
                        spacing={1}
                        direction="column"
                        className={classes.rowSpacing}
                    >
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormTextField
                                    name="id"
                                    label="Id del Fideicomiso"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="nombre"
                                    label="Nombre de Fideicomiso"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CatalogDialog>
            )}
        </Formik>
    );
};

export default DialogFideicomisos;
