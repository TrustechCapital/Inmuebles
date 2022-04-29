import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik, useFormikContext } from 'formik';
import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import { ClavesModuloBienes } from '../../../constants/bienes';
import Individualizacion from '../../../models/Individualizacion';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import { GenericInputProps } from '../../../sharedComponents/GenericTextInput';
import GenericForm, { FormFieldProperties } from '../../../sharedComponents/Forms';
import useNombreFideicomiso from '../../../sharedHooks/useNombreFideicomiso';
import CurrencyInput from 'react-currency-input-field';

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
    idEdificio: ValidationHelpers.validateRequiredString('El edificio'),
    idDepto: ValidationHelpers.validateRequiredString('La unidad/departamento'),
});

type IdFideicomisoFieldType =
    FormFieldProperties<Individualizacion, GenericInputProps> & {
        onChangeFideicomiso: (idFideicomiso: number) => {}
    }

const IdFideicomisoField = (props: IdFideicomisoFieldType) => {
    const { onChangeFideicomiso, ...other } = props;
    const {
        values: { idFideicomiso }
    } = useFormikContext<Individualizacion>();

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
    const [nombreFideicomiso, findNombreFideicomiso] = useNombreFideicomiso([open]);

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
                                <IdFideicomisoField
                                    name="idFideicomiso"
                                    label="Fideicomiso"
                                    helperText="Fideicomiso a asignar bienes"
                                    disabled={pkFieldsDisabled}
                                    dataType="text"
                                    onChangeFideicomiso={findNombreFideicomiso}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="nombreFideicomiso"
                                    label="Nombre de Fideicomiso"
                                    disabled={allFieldsDisabled}
                                    defaultValue={nombreFideicomiso}
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
                                    label="Número de Detalle de Bien"
                                    disabled={pkFieldsDisabled}
                                    dataType="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idSubcuenta"
                                    label="Sub Cuenta"
                                    disabled={pkFieldsDisabled}
                                    dataType="text"
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
                                    dataType="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idDepto"
                                    label="Unidad Condominal/Departamento"
                                    disabled={pkFieldsDisabled}
                                    dataType="text"
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
                                    dataType="text"
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
                                    label="Municipio/Poblacion"
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
                                    dataType="text"
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
                                    dataType="text"
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
                                    name="colindancias"
                                    label="Colindancias"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="medidas"
                                    label="Medidas"
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
                            <Grid item xs={6}>
                                <FormTextField
                                    name="numeroCatastro"
                                    label="Numero Catastro"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CurrencyInput
                                    id="precioCatastro"
                                    name="precioCatastro"
                                    placeholder="Precio Catastro"
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => console.log(value, name)}
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

                            <Grid item xs={6}>
                                <FormCatalogSelectField
                                    name="tipo"
                                    useLabelAsValue={true}
                                    parentCatalogId={
                                        ClavesModuloBienes.TiposDeBienes
                                    }
                                    parentValue={2}
                                    label="Clave de Bien"
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
                                    name="nombreAdquiriente"
                                    label="Nombre adquiriente"
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
                                    name="numeroNotario"
                                    label="Numero Notario"
                                    dataType="text"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="nombreNotario"
                                    label="Nombre Notario"
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
                            <Grid item xs={6}>
                                <FormDatePickerField
                                    name="fechaTrasladoDominio"
                                    label="Fecha Escritura"
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
                        </Grid>
                    </Grid>
                </CatalogDialog>
            )}
        </Formik>
    );
};

export default DialogIndividualizacion;
