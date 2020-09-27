import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik, useFormikContext } from 'formik';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import { ClavesModuloBienes } from '../../../constants/bienes';
import Bien from '../../../models/Bien';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import { GenericInputProps } from '../../../sharedComponents/GenericTextInput';
import GenericSwitch from '../../../sharedComponents/GenericSwitch';
import GenericForm, { FormFieldProperties } from '../../../sharedComponents/Forms';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';
import useNombreFideicomiso from '../../../sharedHooks/useNombreFideicomiso';
import { Typography } from '@material-ui/core';

const {
    FormTextField,
    FormCatalogSelectField,
    FormDatePickerField,
    FormSwitchField,
} = new GenericForm<Bien>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const BienesFormValidator = new FormValidator<Bien>({
    idFideicomiso: ValidationHelpers.validateFideicomiso,
    idSubcuenta: ValidationHelpers.validateSubcuenta,
    idTipoBien: ValidationHelpers.validateRequiredNumber(
        'El tipo de bien es un campo requerido'
    ),
});


type IdFideicomisoFieldType = 
    FormFieldProperties<Bien, GenericInputProps> & {
        onChangeFideicomiso: (idFideicomiso: number) => {}
    }

const IdFideicomisoField = (props: IdFideicomisoFieldType) => {
    const { onChangeFideicomiso, ...other } = props;
    const {
        values: { idFideicomiso }
      } = useFormikContext<Bien>();
    
      React.useEffect(() => {
        
        if (idFideicomiso) {
            onChangeFideicomiso(idFideicomiso);
        }

      }, [idFideicomiso]);

    return (
        <FormTextField
            {...other}
        />
    )
}


const DialogBienes: React.FC<ICatalogDialog<Bien>> = ({
    mode,
    model,
    open,
    errorMessage,
    savingStatus,
    onClose,
    onSaveRequest,
}) => {
    const classes = useStyles();
    const [nombreFideicomiso, findNombreFideicomiso] = useNombreFideicomiso([open]);

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
                                <IdFideicomisoField
                                    name="idFideicomiso"
                                    label="Numero Fideicomiso"
                                    helperText="Fideicomiso a asignar bienes"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                    onChangeFideicomiso={findNombreFideicomiso}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="textSecondary" variant="body2">Nombre del Fideicomiso:<br/> {nombreFideicomiso}</Typography>
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
                                    defaultValue="ACTIVO"
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
