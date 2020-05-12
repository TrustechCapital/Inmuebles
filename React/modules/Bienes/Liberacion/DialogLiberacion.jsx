import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
            nombreCatalogo="Liberacion"
            subtitle="Liberacion de Unidades"
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
                            idCampo="funiIdFideicomiso"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Número de Bien"
                            idCampo="funiIdBien"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="SubCuenta"
                            idCampo="funiIdSubcuenta"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Nombre del Adquiriente"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Nombre del Notario"
                            required={true}
                            value=""
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Valor de la Operación"
                            idCampo="funiCalleNum"
                            required={true}
                            value=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            labelSelector="Fecha de la Escrituración"
                            selectedDate={selectedDate}
                            onChange={handleDateChangeSal}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </CatalogDialog>
    );
}
