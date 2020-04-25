import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';
import Switch from '@material-ui/core/Switch';
import { deepOrange } from '@material-ui/core/colors';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tabla from './BienesTabla';

import Funciones from '../Funciones' //Manejador de llamados a las funciones por URL

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

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: '75ch',
    },
    
      
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function Menu(){
    
    const [modo,setModo]=React.useState('alta');
    const [modtag,setModoT]=React.useState('Alta');
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-04-20'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleDateChangeIni = (date) => {
        setSelectedDate(date);
    };
    const handleDateChangeSal = (date) => {
        setSelectedDate(date);
    };

    const theme = useTheme();
    const [fullWidth] = React.useState('md');
    const [maxWidth] = React.useState('md');

    const classes = useStyles();
    /*manejo del modal*/
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (mode) => {
        //console.log("Try"+this.state.fiso);
        setModo(mode);
        switch(mode){
            case 'alta':
                setModoT('Alta de ');
                break;
            case 'modif':
                setModoT('Modificación de ');
                break;
            case 'consul':
                setModoT('Consulta de ');
                break;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
    
    const handleChangeChk = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleChangeAmount = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const handleChangeStatus = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const DialogFormu=(
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{"Formulario para "+ modtag + "Bienes"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                     Bienes por Fideicomisos
                </DialogContentText>
                <form className={classes.root} noValidate autoComplete="off">
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
                    </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleClose} color="primary">
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
    return(
        <div className={classes.root}>
            <div className={classes.section1}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="outlined-age-native-simple">Fideicomiso</InputLabel>
                        <TextField id="paramIdFideicomiso"  defaultValue="0000" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="paramSubfiso">Sub Fiso</InputLabel>
                        <TextField id="paramSubfiso" defaultValue="0000" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="tipoBien">Tipo de Bien</InputLabel>
                        <Select
                            native
                            value={state.age}
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'tipoBien',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="paramDescripcion">Descripcion</InputLabel>
                        <TextField id="paramDescripcion" defaultValue="Descripcion del Bien" variant="outlined"/>
                    </Grid>
                </Grid>
            </div>
            <Divider variant="middle" flexItem="true"/>
            <div className={classes.section2}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button>Buscar Datos</Button>
                    <Button onClick={() =>handleClickOpen('alta')}>Alta</Button>
                    <Button onClick={() =>handleClickOpen('modif')}>Modificación</Button>
                    <Button onClick={() =>handleClickOpen('consul')}>Consulta</Button>
                    <Button>Baja</Button>
                </ButtonGroup>
            </div>
            <div>
                <Tabla/>
            </div>
            {DialogFormu}
        </div>
    );
}
