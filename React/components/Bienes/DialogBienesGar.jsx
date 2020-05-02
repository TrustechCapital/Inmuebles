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
        <CatalogDialog opened={props.opened} operacionCatalogo={mode} nombreCatalogo="Bienes" subtitle="Bienes en Garantía" onCancel={props.handleClose} onAccept={handleAccept}>
            <GenericTextInput label='Fideicomiso' idCampo='fgrsIdFideicomiso' required={true} defaultVal='0000'/>
            <GenericSelect labelId='ID Garantía' label='ID Garantía' selectId='fgarCveGarantia' selected={state.age} onChange={handleChange}  />
            <GenericTextInput label='SubCuenta' idCampo='fgrsIdSubcuenta'  required={true} defaultVal='0000'/>
            <GenericTextInput label='ID Bien' idCampo='forsIdGarantia'  required={true} defaultVal='0000'/>
            <GenericSelect labelId='Clave Bien' label='Clave de Bien' selectId='forsCveTipoBien' selected={state.age} onChange={handleChange}  />
            <GenericDatePicker labelSelector='Fecha Vencimiento' idSelector='forsFecVencimiento' selectedDate={selectedDate} onChange={handleDateChangeSal}/>
            <GenericTextInput label='Bajo Regimen en Condominio' idCampo='forsRegimenChk'  required={true} defaultVal='0000'/>
            <GenericTextInput label='Descripción' idCampo='forsTextoDescrip'  required={true} defaultVal='0000'/>
            <br/>
            <GenericSwitch nombreCampo='forsCveRevaluaChk' label='Revalua' idCampo='forsCveRevaluaChk' onChange={handleChangeChk} activo={state.fgarCveRevaluaChk}/>
            <br/>
            <GenericTextInput label='Importe' idCampo='forsImpBien'  required={true} defaultVal='0000'/>
            <GenericTextInput label='Importe Última Valuación' idCampo='forsImpUltValua'  required={true} defaultVal='0000'/>
            <GenericSelect labelId='Moneda' label='Moneda' selectId='forsMoneda' selected={state.age} onChange={handleChange}  />
            <GenericDatePicker labelSelector='Fecha Última Valuación' idSelector='forsFecUltValua' selectedDate={selectedDate} onChange={handleDateChangeSal}/>
            <GenericTextInput label='Tipo de Cambio' idCampo='fbifTipoCambio'  required={true} defaultVal='0000'/>
            <GenericSelect labelId='Periodicidad' label='Periodicidad' selectId='forsCvePerValua' selected={state.age} onChange={handleChange}  />
            <GenericTextInput label='Escritura' idCampo='forsNumEscritura' required={true} defaultVal='0000'/>
            <GenericTextInput label='Comentario' idCampo='forsTexComentario' required={true} defaultVal='0000'/>
            <GenericTextInput label='Notario' idCampo='forsNumNotario' required={true} defaultVal='0000'/>
            <GenericSelect labelId='Estatus' label='Estatus' selectId='forsCveStatus' selected={state.age} onChange={handleChange}  />
            <GenericTextInput label='Importe Revaluación' idCampo='txtImporteRevaluacion' required={true} defaultVal='0000'/>
            <GenericDatePicker labelSelector='Fecha' idSelector='txtFecha' selectedDate={selectedDate} onChange={handleDateChangeSal}/>
        </CatalogDialog>
    );
}
