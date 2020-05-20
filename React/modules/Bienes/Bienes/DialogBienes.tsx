import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import { ClavesModuloBienes } from '../../../constants/bienes';
import Bien from '../../../models/Bien';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import GenericSwitch from '../../../sharedComponents/GenericSwitch';
import GenericForm from '../../../sharedComponents/Forms';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';

const {
    FormTextField,
    FormCatalogSelectField,
    FormDatePickerField,
    FormSwitchField,
} = new GenericForm<Bien>();

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

type DialogBienesProps = ICatalogDialog<Bien> & {
    savingStatus: SavingStatus;
    isLoading: boolean;
    errorMessage: string | null;
};

const BienesFormValidator = new FormValidator<Bien>({
    idFideicomiso: ValidationHelpers.validateFideicomiso,
    idSubcuenta: ValidationHelpers.validateSubcuenta,
    idTipoBien: ValidationHelpers.validateRequiredNumber(
        'El tipo de bien es un campo requerido'
    ),
});

const DialogBienes: React.FC<DialogBienesProps> = ({
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
            validationSchema={BienesFormValidator.validationSchema}
        >
            {(props) => (
                <CatalogDialog
                    opened={open}
                    operacionCatalogo={mode}
                    nombreCatalogo="Bienes"
                    subtitle="Bienes por Fideicomisos"
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
                                    helperText="Fideicomiso a asignar bienes"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GenericTextInput
                                    label="Nombre de Fideicomiso"
                                    readOnly={true}
                                    value=""
                                    onChange={() => {}}
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
                                    label="Sub-Fideicomiso"
                                    helperText="SubFiso"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="idTipoBien"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    label="Tipo de Bien"
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
                                    name="importeDelBien"
                                    label="Importe de Bien"
                                    disabled={allFieldsDisabled}
                                    dataType="number"
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
                                <FormTextField
                                    name="importeUltimaValuacion"
                                    label="Importe Última Valuación"
                                    disabled={allFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="comentario"
                                    label="Comentario"
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
                                    label="Fecha de Última Valuación"
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
                                    label="Revalua"
                                    disabled={allFieldsDisabled}
                                    onChange={() => {}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormSwitchField
                                    name="esGarantia"
                                    label="¿Es Garantía?"
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
                                    name="importeDeGarantia"
                                    label="Importe Bien"
                                    disabled={allFieldsDisabled}
                                    dataType="number"
                                    adornment="$"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="picnorado"
                                    label="Picnorado"
                                    disabled={allFieldsDisabled}
                                    dataType="number"
                                    adornment="$"
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
                                <FormDatePickerField
                                    name="fechaInicio"
                                    label="Fecha de Inicio"
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
                                    name="fechaFin"
                                    label="Fecha de Salida"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="estatus"
                                    catalogId={ClavesModuloBienes.Estatus}
                                    useLabelAsValue={true}
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

export default DialogBienes;
