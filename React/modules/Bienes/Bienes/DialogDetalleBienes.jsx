import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GenericSwitch from '../../../sharedComponents/GenericSwitch';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import GenericDatePicker from '../../../sharedComponents/GenericDatePicker';
import GenericSelect from '../../../sharedComponents/GenericSelect';

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
export default function DialogDetalleBienes(props) {
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
            nombreCatalogo="Detalle Bienes"
            subtitle="Detalle de Bien"
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
                            idCampo="fgrsIdFideicomiso"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Id Bien"
                            label="Id Bien"
                            selectId="fgarCveGarantia"
                            selected={state.age}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="SubCuenta"
                            idCampo="fgrsIdSubcuenta"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Id Bien"
                            idCampo="forsIdGarantia"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Clave Bien"
                            label="Clave de Bien"
                            selectId="forsCveTipoBien"
                            selected={state.age}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            labelSelector="Fecha Vencimiento"
                            idSelector="forsFecVencimiento"
                            selectedDate={selectedDate}
                            onChange={handleDateChangeSal}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Bajo Regimen en Condominio"
                            idCampo="forsRegimenChk"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Descripción"
                            idCampo="forsTextoDescrip"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSwitch
                            nombreCampo="forsCveRevaluaChk"
                            label="Revalua"
                            idCampo="forsCveRevaluaChk"
                            onChange={handleChangeChk}
                            activo={state.fgarCveRevaluaChk}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Importe"
                            idCampo="forsImpBien"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Importe Última Valuación"
                            idCampo="forsImpUltValua"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Moneda"
                            label="Moneda"
                            selectId="forsMoneda"
                            selected={state.age}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            labelSelector="Fecha Última Valuación"
                            idSelector="forsFecUltValua"
                            selectedDate={selectedDate}
                            onChange={handleDateChangeSal}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Tipo de Cambio"
                            idCampo="fbifTipoCambio"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Periodicidad"
                            label="Periodicidad"
                            selectId="forsCvePerValua"
                            selected={state.age}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Escritura"
                            idCampo="forsNumEscritura"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Comentario"
                            idCampo="forsTexComentario"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Notario"
                            idCampo="forsNumNotario"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect
                            labelId="Estatus"
                            label="Estatus"
                            selectId="forsCveStatus"
                            selected={state.age}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Importe Revaluación"
                            idCampo="txtImporteRevaluacion"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            labelSelector="Fecha"
                            idSelector="txtFecha"
                            selectedDate={selectedDate}
                            onChange={handleDateChangeSal}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </CatalogDialog>
    );
}
