import React, { useState, useEffect, useCallback } from 'react';

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
import { monedasApi } from '../../../core/api/monedas';
import GenericDatePicker from '../../../sharedComponents/GenericDatePicker';
import { OperacionesCatalogoDetalleBienes } from './constants';

const {
    FormTextField,
    FormSelectField,
    FormCatalogSelectField,
    FormDatePickerField,
} = new GenericForm<DetalleBien>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

function castOperacionCatalogo(
    mode: OperacionesCatalogoDetalleBienes
): OperacionesCatalogo {
    switch (mode) {
        case OperacionesCatalogoDetalleBienes.Registro:
            return OperacionesCatalogo.Alta;
        case OperacionesCatalogoDetalleBienes.Modificacion:
        case OperacionesCatalogoDetalleBienes.Revaluacion:
            return OperacionesCatalogo.Modificacion;
        case OperacionesCatalogoDetalleBienes.Consulta:
            return OperacionesCatalogo.Consulta;
        default:
            return OperacionesCatalogo.Baja;
    }
}

const DetalleBienesFormValidator = new FormValidator<DetalleBien>({
    idTipoDetalleBien: ValidationHelpers.validateRequiredNumber('Tipo de bien'),
    importeDelBien: ValidationHelpers.validateRequiredNumber(
        'Importe del bien'
    ),
    idMoneda: ValidationHelpers.validateRequiredNumber('Moneda'),
});

type DialogDetalleBienesProps = Omit<ICatalogDialog<DetalleBien>, 'mode'> & {
    mode: OperacionesCatalogoDetalleBienes;
};

const DialogDetalleBienes: React.FC<DialogDetalleBienesProps> = ({
    mode,
    model,
    open,
    errorMessage,
    savingStatus,
    onClose,
    onSaveRequest,
}) => {
    const [fechaRevaluacion, setFechaRevaluacion] = useState(new Date());

    const [monedas, setMonedas] = useState([]);
    const classes = useStyles();

    const allFieldsDisabled =
        mode === OperacionesCatalogoDetalleBienes.Consulta ||
        mode === OperacionesCatalogoDetalleBienes.Revaluacion;

    const pkFieldsDisabled = mode !== OperacionesCatalogoDetalleBienes.Registro;

    const revaluacionFieldsDisabled =
        mode === OperacionesCatalogoDetalleBienes.Consulta ||
        mode !== OperacionesCatalogoDetalleBienes.Revaluacion;

    useEffect(() => {
        monedasApi.fetchAll().then((monedas) => {
            setMonedas(monedas);
        });
    }, []);

    const handleChangeFechaRevaluacion = useCallback((e: any) => {
        setFechaRevaluacion(e.target.value);
    }, []);

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
                    operacionCatalogo={castOperacionCatalogo(mode)}
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
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="idTipoBien"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    label="Tipo Bien"
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
                                <FormTextField
                                    name="idSubcuenta"
                                    label="Subcuenta"
                                    disabled={true}
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
                                    parentCatalogId={
                                        ClavesModuloBienes.TiposDeBienes
                                    }
                                    parentValue={props.values.idTipoBien}
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
                                <FormSelectField
                                    name="idMoneda"
                                    items={monedas}
                                    valueKey="idPais"
                                    labelKey="nombreMoneda"
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
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <GenericSwitch
                                    id="forsCveRevaluaChk"
                                    label="Revalua"
                                    checked={
                                        mode ===
                                        OperacionesCatalogoDetalleBienes.Revaluacion
                                    }
                                    disabled={revaluacionFieldsDisabled}
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
                                    label="Importe Revaluación"
                                    disabled={revaluacionFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GenericDatePicker
                                    label="Fecha Revaluación"
                                    value={fechaRevaluacion}
                                    onChange={handleChangeFechaRevaluacion}
                                    disabled={revaluacionFieldsDisabled}
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
