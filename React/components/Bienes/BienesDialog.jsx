import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Slide from '@material-ui/core/Slide';
import { useTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Switch from '@material-ui/core/Switch';
import { deepOrange } from '@material-ui/core/colors';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CatalogDialog from '../commons/CatalogDialog';

const OrangeSwitch = withStyles({
    switchBase: {
      color: deepOrange[300],
      '&$checked': {
        color: deepOrange[500],
      },
      '&$checked + $track': {
        backgroundColor: deepOrange[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

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

    const handleChangeChk = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    const classes = useStyles();

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
        fgarCveRevaluaChk: true,
        fgarEsGarantiaChk: true,
        periodicidad: '',
        status:'',
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

    const handleAccept = () => {
        
    };

    return(
        <CatalogDialog opened={props.opened} operacionCatalogo={mode} nombreCatalogo="Bienes" subtitle="Bienes por Fideicomisos" onCancel={props.handleClose} onAccept={handleAccept}>
            <InputLabel htmlFor="fgarIdFideicomiso">Fideicomiso</InputLabel>
                    <TextField
                        id="fgarIdFideicomiso"
                        fullWidth
                        defaultValue="0000"
                        className={classes.textField}
                        helperText="Fideicomiso a asignar bienes"
                        margin="dense"
                        variant="outlined"
                    />
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
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="fgarCveGarantia">Tipo de Bien</InputLabel>
                        <Select
                            native
                            value={state.age}
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'fgarCveGarantia',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        margin="normal"
                        id="fgarFecUltValua"
                        label="Fecha de Última Valuación"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                    <br/>
                    <FormControlLabel control={
                        <OrangeSwitch checked={state.fgarCveRevaluaChk} onChange={handleChangeChk} name="fgarCveRevaluaChk" id="fgarCveRevaluaChk" />}
                        label="Revalua"/>
                    <br/>
                    <FormControlLabel control={
                        <OrangeSwitch checked={state.fgarEsGarantiaChk} onChange={handleChangeChk} name="fgarEsGarantiaChk" id="fgarEsGarantiaChk" />}
                    label="¿Es Garantía?"/>
                    <br/>
                    <InputLabel htmlFor="fgarImpGarantia">Importe Bien</InputLabel>
                    <OutlinedInput
                        id="fgarImpGarantia"
                        value={values.amount}
                        onChange={handleChangeAmount('amount')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        labelWidth={60}
                    />
                    <InputLabel htmlFor="fgarPjePicnorado">Picnorado</InputLabel>
                    <OutlinedInput
                        id="fgarPjePicnorado"
                        value={values.percent}
                        onChange={handleChangeAmount('percent')}
                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                        labelWidth={60}
                    />
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
