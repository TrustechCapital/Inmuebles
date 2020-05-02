import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


import GenericSwitch from '../commons/GenericSwitch';
import CatalogDialog from '../commons/CatalogDialog';
import GenericTextInput from '../commons/GenericTextInput';
import GenericDatePicker from '../commons/GenericDatePicker';
import GenericSelect from '../commons/GenericSelect';

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
export default function DialogAdquirientes(props){
    const {mode,selected}=props;
    
    const [selectedDate, setSelectedDate] =useState(new Date('2020-04-20'));

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
        status:''
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
        percent:'',
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
    const handleAccept = () => {
        
    };

    return(
        <CatalogDialog opened={props.opened} operacionCatalogo={mode} nombreCatalogo="Adquirientes" subtitle="Adquirientes" onCancel={props.handleClose} onAccept={handleAccept}>
            <GenericTextInput label='Fideicomiso' idCampo='fgarIdFideicomiso' helper='Fideicomiso a asignar bienes' required={true} defaultVal='0000'/>
            <GenericTextInput label='Sub Cuenta' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Expediente Catastro' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Número de Inmueble' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Edificio' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Número de Unidad' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Adquiriente' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericDatePicker idSelector='fgarFecFin' labelSelector='Fecha de Escritura' selectedDate={selectedDate} onChange={handleDateChangeSal}/> 
            <GenericTextInput label='Desarrollo' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Escritura' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Prototipo' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Número Oficial' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Notaría' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Delegados Funcionarios' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Valor Liberación' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericSelect labelId='Notario' label='Notario' selectId='fgarCvePerValua' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
            <GenericSelect labelId='Moneda' label='Moneda' selectId='fgarCvePerValua' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
            <GenericTextInput label='Localidad' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericSelect labelId='Tipo de Venta' label='Tipo de Venta' selectId='fgarCvePerValua' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
            <GenericSelect labelId='Estatus' label='Estatus' selectId='fgarCvePerValua' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
        </CatalogDialog>
    );
}
