import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GenericSwitch from '../../sharedComponents/GenericSwitch';
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
            nombreCatalogo="Usuarios"
            subtitle="Mantenimiento de Usuarios"
            onCancel={props.handleClose}
            onAccept={handleAccept}
        >
            <GenericTextInput
                label="Nombre"
                idCampo="usuNumUsuario"
                helper="Fideicomiso a asignar bienes"
                required={true}
                value=""
            />
            <GenericTextInput
                label="Usuario OID"
                idCampo="usuNomUsuario"
                helper="SubFiso"
                required={true}
                value=""
            />
            <GenericSelect
                labelId="Tipo de Usuario"
                label="Tipo de Usuario"
                selectId="usuTipoUsuario"
                selected={state.periodicidad}
                onChange={handleChangePeriodi}
            />
            <GenericSelect
                labelId="Perfil Cliente"
                label="Perfil Cliente"
                selectId="usuNumPuesto"
                selected={state.periodicidad}
                onChange={handleChangePeriodi}
            />
            <GenericSelect
                labelId="Status"
                label="Status"
                selectId="usuCveStUsuario"
                selected={state.periodicidad}
                onChange={handleChangePeriodi}
            />
        </CatalogDialog>
    );
}
