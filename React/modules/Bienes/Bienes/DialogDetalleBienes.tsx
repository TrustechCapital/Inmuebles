import React, { useState, useEffect, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
import { OperacionesCatalogoDetalleBienes } from './constants';
import { RevaluacionDetalleBien } from './types';

type DialogBienesForm = {
    model: DetalleBien;
    datosRevaluacion: RevaluacionDetalleBien;
};

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

type DialogDetalleBienesProps = Omit<ICatalogDialog<DetalleBien>, 'mode'> & {
    mode: OperacionesCatalogoDetalleBienes;
    onRevaluacion: (
        model: DetalleBien,
        revaluacionDetalleBien: RevaluacionDetalleBien
    ) => void;
};

const DialogDetalleBienes: React.FC<DialogDetalleBienesProps> = ({
    mode,
    model,
    open,
    errorMessage,
    savingStatus,
    onClose,
    onSaveRequest,
    onRevaluacion,
}) => {
    const esRevaluacion = mode === OperacionesCatalogoDetalleBienes.Revaluacion;

    function handleSave(formData: DialogBienesForm) {
        if (esRevaluacion) {
            onRevaluacion(formData.model, formData.datosRevaluacion);
            return;
        }

        onSaveRequest(formData.model);
    }

    const DetalleBienesFormValidator = useMemo(() => {
        if (esRevaluacion) {
            return new FormValidator({
                datosRevaluacion: Yup.object().shape({
                    importeRevaluacion: ValidationHelpers.validateRequiredNumber(
                        'Importe'
                    ),
                    fechaRevaluacion: Yup.date().required(
                        ValidationHelpers.requiredFieldMessage(
                            'Fecha Revaluacion'
                        )
                    ),
                }),
            });
        }

        return new FormValidator({
            model: Yup.object().shape({
                idTipoDetalleBien: ValidationHelpers.validateRequiredNumber(
                    'Tipo de bien'
                ),
                importeDelBien: ValidationHelpers.validateRequiredNumber(
                    'Importe del bien'
                ),
                idMoneda: ValidationHelpers.validateRequiredNumber('Moneda'),
            }),
        });
    }, [esRevaluacion]);

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

    const initialValues: DialogBienesForm = {
        model,
        datosRevaluacion: {
            importeRevaluacion: null,
            fechaRevaluacion: new Date(),
        },
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSave}
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
                                    namespace="model"
                                    name="idFideicomiso"
                                    label="Fideicomiso"
                                    dataType="text"
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    namespace="model"
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
                                    namespace="model"
                                    name="idSubcuenta"
                                    label="Subcuenta"
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    namespace="model"
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
                                    namespace="model"
                                    name="idTipoDetalleBien"
                                    parentCatalogId={
                                        ClavesModuloBienes.TiposDeBienes
                                    }
                                    parentValue={props.values.model.idTipoBien}
                                    label="Clave de Bien"
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
                                    namespace="model"
                                    name="idRegimen"
                                    label="Bajo Regimen en Condominio"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    namespace="model"
                                    name="importeDelBien"
                                    label="Importe"
                                    dataType="money"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <FormTextField
                                    namespace="model"
                                    name="descripcion"
                                    label="Descripción"
                                    disabled={allFieldsDisabled}
                                    multiline
                                    rows={3}
                                    rowsMax={3}
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
                                    namespace="model"
                                    name="importeUltimaValuacion"
                                    label="Importe Última Valuación"
                                    dataType="money"
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormSelectField
                                    namespace="model"
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
                                    namespace="model"
                                    name="fechaUltimaValuacion"
                                    label="Fecha Última Valuación"
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
                                    namespace="model"
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
                                    namespace="model"
                                    name="comentario"
                                    label="Comentario"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    namespace="model"
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
                                    namespace="model"
                                    name="claveEstatus"
                                    catalogId={ClavesModuloBienes.Estatus}
                                    useLabelAsValue={true}
                                    label="Estatus"
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
                                <FormTextField<RevaluacionDetalleBien>
                                    namespace="datosRevaluacion"
                                    name="importeRevaluacion"
                                    label="Importe Revaluación"
                                    dataType="money"
                                    disabled={revaluacionFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormDatePickerField<RevaluacionDetalleBien>
                                    namespace="datosRevaluacion"
                                    name="fechaRevaluacion"
                                    label="Fecha Revaluación"
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
