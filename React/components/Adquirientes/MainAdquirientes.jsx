import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//Generic Custom Components

import {OPERACIONES_CATALOGO} from '../../constantes.js';

import Funciones from '../Funciones' //Manejador de llamados a las funciones por URL

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

  
export default function Menu(){
    
    const classes = useStyles();

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
        fgarCveRevaluaChk: true,
        fgarEsGarantiaChk: true,
        periodicidad: '',
        status:'',
        open:false,
        modo:'alta',
        dtabla:{},
    });

    const handleChange = (event) => {
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

    const handleTableSelect = (tableV) =>{
        //console.log('MainBienes Log: ',tableV);
        setState({dtabla:tableV});
    }
    const handleClickOpen = (mode) => {
        setState({open:true,modo:mode});
    };
    const handleClose = () => {
        setState({open:false});
    };
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
            <Divider variant="middle" flexItem={true}/>
            <div className={classes.section2}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button>Buscar Datos</Button>
                    <Button onClick={() =>handleClickOpen(OPERACIONES_CATALOGO.ALTA)}>Alta</Button>
                    <Button onClick={() =>handleClickOpen(OPERACIONES_CATALOGO.MODIFICACION)}>Modificación</Button>
                    <Button onClick={() =>handleClickOpen(OPERACIONES_CATALOGO.CONSULTA)}>Consulta</Button>
                    <Button>Baja</Button>
                </ButtonGroup>
            </div>
            <div>
                
            </div>
            
        </div>
    );
}
