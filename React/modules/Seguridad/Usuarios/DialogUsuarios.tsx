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

const { FormTextField, FormCatalogSelectField } = new GenericForm<Usuarios>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}))

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
                                    name="nombre"
                                    label="Nombre"
                                    disabled={allFieldsDisabled}
                                    dataType="text"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormTextField
                                    name="idUsuario"
                                    label="Usuario OID"
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
                                <FormTextField
                                    name="email"
                                    label="E-mail"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormCatalogSelectField
                                    name="idPerfil"
                                    catalogId={
                                        ClavesModuloUsuarios.TiposDeUsuario
                                    }
                                    label="Tipo"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormCatalogSelectField
                                    name="estatus"
                                    catalogId={
                                        ClavesModuloUsuarios.StatusDeUsuario
                                    }
                                    label="Estatus"
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

export default DialogUsuarios;
