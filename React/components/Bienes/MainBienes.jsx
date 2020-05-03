import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import Tabla from './BienesTabla';
import BienesDialog from './BienesDialog';
import { OPERACIONES_CATALOGO } from '../../constantes.js';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        marginLeft: '.5rem'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    rowSpacing: {
        marginBottom: theme.spacing(2)
    } 
}));

  
export default function Menu(){
    const classes = useStyles();

    const [state, setState] = React.useState({
        open:false,
        modo:'alta',
        selectedRowsBienesTabla: [],
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
        <div>
            <Grid container spacing={1} direction="column" className={classes.rowSpacing}>
                <div className={classes.root}>
                    <ExpansionPanel defaultExpanded elevation={3}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                        >
                            <Grid container spacing={1} direction="row" alignItems="center">
                                <SearchIcon fontSize="small"/>
                                <Typography variant="subtitle1" className={classes.heading}>Parametros de busqueda</Typography>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <Grid container spacing={1} direction="column">
                                <Grid container className={classes.rowSpacing} spacing={4}>
                                    <Grid item xs={3}>
                                        <TextField id="paramIdFideicomiso" label="Id Fideicomiso" fullWidth/>
                                    </Grid>
                                    <Grid container xs={9} alignItems="center">
                                        <Container></Container>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={2}>
                                        <TextField id="paramSubfiso" label="Id Subcuenta" fullWidth/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="tipoBien">Tipo de Bien</InputLabel>
                                            <Select labelId="tipoBien" displayEmpty>
                                                <MenuItem value=""></MenuItem>
                                                <MenuItem value={1}>Tipo 1</MenuItem>
                                                <MenuItem value={2}>Tipo 2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <TextField id="paramDescripcion" label="Descripcion" fullWidth/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="secondary" startIcon={<SearchIcon />}>Buscar</Button>
                            </Grid>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>
            </Grid>
            
            <Grid container spacing={1}>
                <Tabla onSelect={handleTableSelect}/>
                <BienesDialog mode={state.modo} opened={state.open} selected={state.selectedRowsBienesTabla} handleClose={handleClose}/>
            </Grid>
        </div>
    );
}
