import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import { ClavesModuloUsuarios } from '../../../constants/usuarios';
import Usuarios from '../../../models/Usuarios';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericForm from '../../../sharedComponents/Forms';
//import FormValidator, { ValidationHelpers } from '../../services/FormValidator';

const { FormTextField, FormCatalogSelectField } = new GenericForm<Usuarios>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

/*const UsuariosFormValidator = new FormValidator<Usuarios>({
    idFideicomiso: ValidationHelpers.validateFideicomiso,
    idSubcuenta: ValidationHelpers.validateSubcuenta,
    idTipoUsuarios: ValidationHelpers.validateRequiredNumber(
        'El tipo de bien es un campo requerido'
    ),
});
*/

const DialogUsuarios: React.FC<ICatalogDialog<Usuarios>> = ({
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
            //validationSchema={UsuariosFormValidator.validationSchema}
        >
            {(props) => (
                <CatalogDialog
                    opened={open}
                    operacionCatalogo={mode}
                    nombreCatalogo="Usuarios"
                    subtitle="Usuarios del sistema"
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
                                    name="nombreUsuario"
                                    label="Nombre"
                                    disabled={pkFieldsDisabled}
                                    dataType="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="numeroUsuario"
                                    label="Numero"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="tipoUsuario"
                                    catalogId={
                                        ClavesModuloUsuarios.TiposDeUsuario
                                    }
                                    label="Tipo de Usuarios"
                                    disabled={pkFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="numeroPuesto"
                                    catalogId={
                                        ClavesModuloUsuarios.TiposDeUsuario //TODO: PUESTOS SE CARGAN DE UN CATALOGO
                                    }
                                    label="Tipo de Usuarios"
                                    disabled={pkFieldsDisabled}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="claveStatus"
                                    catalogId={
                                        ClavesModuloUsuarios.TiposDeUsuario //TODO: PUESTOS SE CARGAN DE UN CATALOGO
                                    }
                                    label="Status"
                                    disabled={pkFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}></Grid>
                        </Grid>
                    </Grid>
                </CatalogDialog>
            )}
        </Formik>
    );
};

export default DialogUsuarios;
