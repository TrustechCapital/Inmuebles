import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
export default function BienesDialog(props){
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
        <CatalogDialog opened={props.opened} operacionCatalogo={mode} nombreCatalogo="Bienes" subtitle="Bienes por Fideicomisos" onCancel={props.handleClose} onAccept={handleAccept}>
            <GenericTextInput label='Fideicomiso' idCampo='fgarIdFideicomiso' helper='Fideicomiso a asignar bienes' required={true} defaultVal='0000'/>
            <GenericTextInput label='Sub-Fideicomiso' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
            <GenericSelect labelId='Tipo de Bien' selectId='fgarCveGarantia' selected={state.age} onChange={handleChange} label='Tipo de Bien' />
            <GenericTextInput label='Importe Garantizado' idCampo='fgarImpGarantizad' required={false} defaultVal='0000'/>
            <GenericTextInput label='Descripcion' idCampo='fgarTexGarantia' required={false} defaultVal='0000'/>
            <GenericTextInput label='Importe Última Valuación' idCampo='fgarImpUltValua' required={false} defaultVal='0000'/>
            <GenericTextInput label='Comentario' idCampo='fgarTexComentario' required={false} defaultVal='0000'/>                            
            <GenericDatePicker idSelector='fgarFecUltValua' labelSelector='Fecha de Última Valuación' selectedDate={selectedDate} onChange={handleDateChange}/>
            <br/>
            <GenericSwitch idCampo='fgarCveRevaluaChk' onChange={handleChangeChk} activo={state.fgarCveRevaluaChk} nombreCampo='fgarCveRevaluaChk' label='Revalua'/>
            <br/>
            <GenericSwitch idCampo='fgarEsGarantiaChk' onChange={handleChangeChk} activo={state.fgarEsGarantiaChk} nombreCampo='fgarEsGarantiaChk' label='¿Es Garantía?'/>
            <br/>
            <GenericTextInput label='Importe Bien' idCampo='fgarImpGarantia' required={true} defaultVal='00.00' adornment='$'/>
            <GenericTextInput label='Picnorado' idCampo='fgarPjePicnorado' required={true} defaultVal='00.00' adornment='%'/>
            <GenericSelect labelId='Periodicidad' selectId='fgarCvePerValua' selected={state.periodicidad} onChange={handleChangePeriodi} label='Periodicidad' />
            <GenericDatePicker idSelector='fgarFecInicio' labelSelector='Fecha de Inicio' selectedDate={selectedDate} onChange={handleDateChangeIni}/>
            <GenericDatePicker idSelector='fgarFecFin' labelSelector='Fecha de Salida' selectedDate={selectedDate} onChange={handleDateChangeSal}/>
            <GenericSelect labelId='Periodicidad' selectId='fgarCvePerfgarCveStatusValua' selected={state.status} onChange={handleChangeStatus} label='Status' />
        </CatalogDialog>
    );
}
