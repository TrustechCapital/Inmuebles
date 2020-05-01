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
                    <InputLabel htmlFor="fgarIdSubcuenta">Sub-Fideicomiso</InputLabel>
                    <TextField
                        id="fgarIdSubcuenta"
                        fullWidth
                        defaultValue="0000"
                        className={classes.textField}
                        helperText="Sub-Fiso"
                        margin="dense"
                        variant="outlined"
                    />
                    <GenericSelect labelId='Tipo de Bien' selectId='fgarCveGarantia' selected={state.age} onChange={handleChange} label='Tipo de Bien' />
                    <InputLabel htmlFor="fgarImpGarantizad">Importe Garantizado</InputLabel>
                    <TextField
                        id="fgarImpGarantizad"
                        fullWidth
                        defaultValue="0000"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                    />
                    <InputLabel htmlFor="fgarTexGarantia">Descripción</InputLabel>
                    <TextField
                        id="fgarTexGarantia"
                        fullWidth
                        defaultValue="0000"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                    />
                    <InputLabel htmlFor="fgarImpUltValua">Importe Última Valuación</InputLabel>
                    <TextField
                        id="fgarImpUltValua"
                        fullWidth
                        defaultValue="0000"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                    />
                    <InputLabel htmlFor="fgarTexComentario">Comentario</InputLabel>
                    <TextField
                        id="fgarTexComentario"
                        fullWidth
                        defaultValue="0000"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                    />
                    <GenericDatePicker idSelector='fgarFecUltValua' labelSelector='Fecha de Última Valuación' selectedDate={selectedDate} onChange={handleDateChange}/>
                    <br/>
                        <GenericSwitch idCampo='fgarCveRevaluaChk' onChange={handleChangeChk} activo={state.fgarCveRevaluaChk} nombreCampo='fgarCveRevaluaChk' label='Revalua'/>
                    <br/>
                        <GenericSwitch idCampo='fgarEsGarantiaChk' onChange={handleChangeChk} activo={state.fgarEsGarantiaChk} nombreCampo='fgarEsGarantiaChk' label='¿Es Garantía?'/>
                    <br/>
                    <GenericTextInput label='Importe Bien' idCampo='fgarImpGarantia' required={true} defaultVal='00.00' adornment='$'/>
                    <GenericTextInput label='Picnorado' idCampo='fgarPjePicnorado' required={true} defaultVal='00.00' adornment='%'/>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="fgarCvePerValua">Periodicidad</InputLabel>
                        <Select
                            native
                            value={state.periodicidad}
                            onChange={handleChangePeriodi}
                            inputProps={{
                                name: 'periodicidad',
                                id: 'fgarCvePerValua',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        margin="normal"
                        id="fgarFecInicio"
                        label="Fecha de Inicio"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChangeIni}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        margin="normal"
                        id="fgarFecFin"
                        label="Fecha de Salida"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChangeSal}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="fgarCveStatus">Status</InputLabel>
                        <Select
                            native
                            value={state.status}
                            onChange={handleChangeStatus}
                            inputProps={{
                                name: 'status',
                                id: 'fgarCveStatus',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
        </CatalogDialog>
    );
}
