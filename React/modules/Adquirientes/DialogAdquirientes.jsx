import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CatalogDialog from '../../sharedComponents/CatalogDialog';
import GenericTextInput from '../../sharedComponents/GenericTextInput';
import GenericDatePicker from '../../sharedComponents/GenericDatePicker';
import GenericSelect from '../../sharedComponents/GenericSelect';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 150,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: '75ch',
    },
}));
export default function DialogAdquirientes(props) {
    const { mode, selected } = props;

    const [selectedDate, setSelectedDate] = useState(new Date('2020-04-20'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleDateChangeIni = (date) => {
        setSelectedDate(date);
    };
    const handleDateChangeSal = (date) => {
        setSelectedDate(date);
    };

    const classes = useStyles();

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
        fgarCveRevaluaChk: true,
        fgarEsGarantiaChk: true,
        periodicidad: '',
        status: '',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleChangePeriodi = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const [values, setValues] = React.useState({
        amount: '',
        percent: '',
    });

    const handleChangeAmount = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleChangeStatus = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangeChk = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleAccept = () => {};

    return (
        <CatalogDialog
            opened={props.opened}
            operacionCatalogo={mode}
            nombreCatalogo="Adquirientes"
            subtitle="Adquirientes"
            onCancel={props.handleClose}
            onAccept={handleAccept}
        >
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Fideicomiso"
                            idCampo="fadqIdFideicomiso"
                            helper="Fideicomiso a asignar bienes"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Sub Cuenta"
                            idCampo="fadqIdSubcuenta"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Expediente Catastro"
                            idCampo="fadqExpCatast"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Número de Inmueble"
                            idCampo="fadqIdBien"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Edificio"
                            idCampo="fadqIdEdificio"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Número de Unidad"
                            idCampo="fadqIdDepto"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Adquiriente"
                            idCampo="fadqNombreComprador"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            idSelector="fadqFecEscricom"
                            labelSelector="Fecha de Escritura"
                            selectedDate={selectedDate}
                            onChange={handleDateChangeSal}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Desarrollo"
                            idCampo="fadqNomComprador"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Escritura"
                            idCampo="fadqNumEscrcom"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Prototipo"
                            idCampo="fadqPrototipo"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Número Oficial"
                            idCampo="fadqNumeroOficial"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Notaría"
                            idCampo="fadqNotaria"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Delegados Funcionarios"
                            idCampo="fadqDelegadoFiduciario"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Valor Liberación"
                            idCampo="fadqValor"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Notario"
                            label="Notario"
                            selectId="fadqNotario"
                            selected={state.periodicidad}
                            onChange={handleChangePeriodi}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Moneda"
                            label="Moneda"
                            selectId="fadqMoneda"
                            selected={state.periodicidad}
                            onChange={handleChangePeriodi}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Localidad"
                            idCampo="fadqLocalidad"
                            helper="SubFiso"
                            required={true}
                            defaultVal="0000"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Tipo de Venta"
                            label="Tipo de Venta"
                            selectId="fadqTipoVenta"
                            selected={state.periodicidad}
                            onChange={handleChangePeriodi}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Estatus"
                            label="Estatus"
                            selectId="fadqStatus"
                            selected={state.periodicidad}
                            onChange={handleChangePeriodi}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </CatalogDialog>
    );
}
