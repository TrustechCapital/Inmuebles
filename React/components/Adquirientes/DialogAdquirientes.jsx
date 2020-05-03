import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
            <GenericTextInput label='Fideicomiso' idCampo='fadqIdFideicomiso' helper='Fideicomiso a asignar bienes' required={true} defaultVal='0000'/>
            <GenericTextInput label='Sub Cuenta' idCampo='fadqIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Expediente Catastro' idCampo='fadqExpCatast' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Número de Inmueble' idCampo='fadqIdBien' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Edificio' idCampo='fadqIdEdificio' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Número de Unidad' idCampo='fadqIdDepto' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericTextInput label='Adquiriente' idCampo='fadqNombreComprador' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericDatePicker idSelector='fadqFecEscricom' labelSelector='Fecha de Escritura' selectedDate={selectedDate} onChange={handleDateChangeSal}/> 
            <GenericTextInput label='Desarrollo' idCampo='fadqNomComprador' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Escritura' idCampo='fadqNumEscrcom' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Prototipo' idCampo='fadqPrototipo' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Número Oficial' idCampo='fadqNumeroOficial' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Notaría' idCampo='fadqNotaria' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Delegados Funcionarios' idCampo='fadqDelegadoFiduciario' helper='SubFiso' required={true} defaultVal='0000'/> 
            <GenericTextInput label='Valor Liberación' idCampo='fadqValor' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericSelect labelId='Notario' label='Notario' selectId='fadqNotario' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
            <GenericSelect labelId='Moneda' label='Moneda' selectId='fadqMoneda' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
            <GenericTextInput label='Localidad' idCampo='fadqLocalidad' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericSelect labelId='Tipo de Venta' label='Tipo de Venta' selectId='fadqTipoVenta' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
            <GenericSelect labelId='Estatus' label='Estatus' selectId='fadqStatus' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
        </CatalogDialog>
    );
}
