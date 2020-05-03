import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GenericSwitch from '../commons/GenericSwitch';
import CatalogDialog from '../commons/CatalogDialog';
import GenericTextInput from '../commons/GenericTextInput';
import GenericDatePicker from '../commons/GenericDatePicker';
import GenericSelect from '../commons/GenericSelect';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    rowSpacing: {
        marginBottom: theme.spacing(2)
    }
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
        <CatalogDialog opened={props.opened} operacionCatalogo={mode} nombreCatalogo="Garantías" subtitle="Garantías por Fideicomisos" onCancel={props.handleClose} onAccept={handleAccept}>
            <Grid container spacing={1} direction="column" className={classes.rowSpacing}>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Fideicomiso' idCampo='fgarIdFideicomiso' helper='Fideicomiso a asignar bienes' required={true} defaultVal='0000'/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Nombre de Fideicomiso' idCampo='fgarNomFideicomiso' readOnly={true} defaultVal='ABCD'/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Sub-Fideicomiso' idCampo='fgarIdSubcuenta' helper='SubFiso' required={true} defaultVal='0000'/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect labelId='Tipo de Bien' selectId='fgarCveGarantia' selected={state.age} onChange={handleChange} label='Tipo de Bien' />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Importe Garantizado' idCampo='fgarImpGarantizad' required={false} defaultVal='0000'/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Descripcion' idCampo='fgarTexGarantia' required={false} defaultVal='0000'/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Importe Última Valuación' idCampo='fgarImpUltValua' required={false} defaultVal='0000'/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Comentario' idCampo='fgarTexComentario' required={false} defaultVal='0000'/>                            
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                    <GenericDatePicker idSelector='fgarFecUltValua' labelSelector='Fecha de Última Valuación' selectedDate={selectedDate} onChange={handleDateChange}/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSwitch idCampo='fgarCveRevaluaChk' onChange={handleChangeChk} activo={state.fgarCveRevaluaChk} nombreCampo='fgarCveRevaluaChk' label='Revalua'/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSwitch idCampo='fgarEsGarantiaChk' onChange={handleChangeChk} activo={state.fgarEsGarantiaChk} nombreCampo='fgarEsGarantiaChk' label='¿Es Garantía?'/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Importe Bien' idCampo='fgarImpGarantia' required={true} defaultVal='00.00' adornment='$'/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Picnorado' idCampo='fgarPjePicnorado' required={true} defaultVal='00.00' adornment='%'/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect labelId='Periodicidad' selectId='fgarCvePerValua' selected={state.periodicidad} onChange={handleChangePeriodi} label='Periodicidad' />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericDatePicker idSelector='fgarFecInicio' labelSelector='Fecha de Inicio' selectedDate={selectedDate} onChange={handleDateChangeIni}/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericDatePicker idSelector='fgarFecFin' labelSelector='Fecha de Salida' selectedDate={selectedDate} onChange={handleDateChangeSal}/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect labelId='Periodicidad' selectId='fgarCvePerfgarCveStatusValua' selected={state.status} onChange={handleChangeStatus} label='Status' />
                    </Grid>
                </Grid>
        </Grid>
    </CatalogDialog>
    );
}
