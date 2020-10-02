import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import { ClavesModuloBienes } from '../../../constants/bienes';
import Individualizacion from '../../../models/Individualizacion';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import GenericForm from '../../../sharedComponents/Forms';
import { monedasApi } from '../../../core/api/monedas';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';

const {
    FormTextField,
    FormCatalogSelectField,
    FormSelectField,
    FormDatePickerField,
} = new GenericForm<Individualizacion>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const IndividualizacionesFormValidator = new FormValidator<Individualizacion>({
    idFideicomiso: ValidationHelpers.validateFideicomiso,
    idSubcuenta: ValidationHelpers.validateSubcuenta,
    idBien: ValidationHelpers.validateInmueble,
    idEdificio: ValidationHelpers.validateEdificio,
    idDepto: ValidationHelpers.validateDepto,
});

const DialogIndividualizacion: React.FC<ICatalogDialog<Individualizacion>> = ({
    mode,
    model,
    open,
    errorMessage,
    savingStatus,
    onClose,
    onSaveRequest,
}) => {
    const [monedas, setMonedas] = useState([]);

    const classes = useStyles();

    const allFieldsDisabled = mode === OperacionesCatalogo.Consulta;
    const pkFieldsDisabled =
        allFieldsDisabled || mode === OperacionesCatalogo.Modificacion;

    useEffect(() => {
        monedasApi.fetchAll().then((monedas) => {
            setMonedas(monedas);
        });
    }, []);

    return (
        <Formik
            initialValues={model}
            onSubmit={onSaveRequest}
            enableReinitialize={true}
            validationSchema={IndividualizacionesFormValidator.validationSchema}
        >
            {(props) => (
                <CatalogDialog
                    opened={open}
                    operacionCatalogo={mode}
                    nombreCatalogo="Individualizaciones"
                    subtitle="Individualizaciones por Fideicomisos"
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
                                    name="idBien"
                                    label="Número de Inmueble"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idSubcuenta"
                                    label="Sub Cuenta"
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
                                <FormTextField
                                    name="idEdificio"
                                    label="Edificio"
                                    disabled={pkFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idDepto"
                                    label="Unidad Condominal"
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
                                    name="niveles"
                                    label="Niveles"
                                    dataType="number"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="calleYNumero"
                                    label="Calle"
                                    dataType="text"
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
                                    name="nombreColonia"
                                    label="Colonia"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="nombrePoblacion"
                                    label="Poblacion"
                                    dataType="text"
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
                                    name="codigoPostal"
                                    label="Código Postal"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="numeroPais"
                                    label="Pais"
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
                                    name="numeroEstado"
                                    label="Estado"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="estacionamiento1"
                                    label="Estacionamiento 1"
                                    dataType="text"
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
                                    name="estacionamiento2"
                                    label="Estacionamiento 2"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="estacionamiento3"
                                    label="Estacionamiento 3"
                                    dataType="text"
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
                                    name="roofGarden"
                                    label="Otro"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="sotano"
                                    label="Otro 2"
                                    dataType="text"
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
                                    name="indiviso"
                                    label="Indiviso"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="precio"
                                    label="Registro Contable"
                                    dataType="text"
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
                                    name="precioCatastro"
                                    label="Precio Catastro"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormSelectField
                                    name="moneda"
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
                                <FormCatalogSelectField
                                    name="status"
                                    catalogId={ClavesModuloBienes.Estatus}
                                    useLabelAsValue={true}
                                    defaultValue="LIBERADO"
                                    label="Estatus"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="acto1"
                                    label="Acto1"
                                    dataType="text"
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
                                    name="acto2"
                                    label="Acto 2"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="acto3"
                                    label="Acto 3"
                                    dataType="text"
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
                                    name="acto4"
                                    label="Acto 4"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="notario"
                                    label="Notario"
                                    dataType="text"
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
                                    name="numeroEscritura"
                                    label="Escritura"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="folioReal"
                                    label="Folio"
                                    dataType="text"
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
                                    name="fechaTrasladoDominio"
                                    label="Fecha Traslativo"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormDatePickerField
                                    name="fechaReversion"
                                    label="Fecha Revesrion"
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

export default DialogIndividualizacion;
