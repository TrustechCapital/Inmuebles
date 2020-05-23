import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import { ClavesModuloBienes } from '../../../constants/bienes';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericSwitch from '../../../sharedComponents/GenericSwitch';
import GenericForm from '../../../sharedComponents/Forms';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';
import DetalleBien from '../../../models/DetalleBien';

const {
    FormTextField,
    FormCatalogSelectField,
    FormDatePickerField,
} = new GenericForm<DetalleBien>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const DetalleBienesFormValidator = new FormValidator<DetalleBien>({
    idFideicomiso: ValidationHelpers.validateFideicomiso,
    idSubcuenta: ValidationHelpers.validateSubcuenta,
    idTipoBien: ValidationHelpers.validateRequiredNumber(
        'El tipo de bien es un campo requerido'
    ),
    idTipoDetalleBien: ValidationHelpers.validateRequiredNumber(
        'El tipo de bien es un campo requerido'
    ),
});

const DialogDetalleBienes: React.FC<ICatalogDialog<DetalleBien>> = ({
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
            validationSchema={DetalleBienesFormValidator.validationSchema}
        >
            {(props) => (
                <CatalogDialog
                    opened={open}
                    operacionCatalogo={mode}
                    nombreCatalogo="Detalle Bienes"
                    subtitle="Detalle del Bien"
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
                                    name="idFideicomiso"
                                    label="Fideicomiso"
                                    disabled={pkFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="idTipoBien"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    label="Tipo Bien"
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
                                    name="idSubcuenta"
                                    label="Subcuenta"
                                    disabled={pkFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idDetalleBien"
                                    label="Id Detalle Bien"
                                    disabled={true}
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
                                    name="idTipoDetalleBien"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    label="Clave de Bien"
                                    disabled={pkFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormDatePickerField
                                    name="fechaVencimiento"
                                    label="Fecha Vencimiento"
                                    disabled={allFieldsDisabled}
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
                                    name="idRegimen"
                                    label="Bajo Regimen en Condominio"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="descripcion"
                                    label="Descripción"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <GenericSwitch
                                    id="forsCveRevaluaChk"
                                    label="Revalua"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="importeDelBien"
                                    label="Importe"
                                    disabled={allFieldsDisabled}
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
                                    name="importeUltimaValuacion"
                                    label="Importe Última Valuación"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="idMoneda"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    label="Moneda"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormDatePickerField
                                    name="fechaUltimaValuacion"
                                    label="Fecha Última Valuación"
                                    disabled={allFieldsDisabled}
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
                                    name="idClavePeriodicidadRevaluacion"
                                    catalogId={
                                        ClavesModuloBienes.PeriodicidadDeRevaluacion
                                    }
                                    label="Periodicidad"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="numeroEscritura"
                                    label="Escritura"
                                    disabled={allFieldsDisabled}
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
                                    name="comentario"
                                    label="Comentario"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="numeroNotario"
                                    label="Notario"
                                    disabled={allFieldsDisabled}
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
                                    name="claveEstatus"
                                    catalogId={ClavesModuloBienes.Estatus}
                                    useLabelAsValue={true}
                                    label="Estatus"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="importeUltimaValuacion"
                                    label="Importe Revaluación"
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

export default DialogDetalleBienes;
