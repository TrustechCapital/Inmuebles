import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import Tabla from './TableBienes';
import DialogGarantias from './DialogGarantias';
import { OPERACIONES_CATALOGO } from '../../constantes.js';


const useStyles = makeStyles((theme) => ({
    searchCard: {
        borderColor: theme.palette.secondary.main
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
                <Card className={classes.searchCard} variant="outlined">
                    <CardContent>
                        <Grid container spacing={1} direction="column">
                            <Grid container className={classes.rowSpacing} spacing={4}>
                                <Grid item xs={4}>
                                    <TextField id="paramIdFideicomiso" label="Id Fideicomiso" defaultValue="1" fullWidth/>
                                </Grid>
                                <Grid container xs={8} alignItems="center">
                                    <Container>Fideicomiso 1</Container>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={2}>
                                    <TextField id="paramSubfiso" label="Id Subcuenta" defaultValue="1" fullWidth/>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="tipoBien">Tipo de Bien</InputLabel>
                                        <Select labelId="tipoBien" value={1}>
                                            <MenuItem value={1}>Tipo 1</MenuItem>
                                            <MenuItem value={2}>Tipo 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField id="paramDescripcion" label="Descripcion" fullWidth/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="flex-end">
                            <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                                <Button color="secondary" startIcon={<SearchIcon />}>Buscar Datos</Button>
                            </ButtonGroup>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid container spacing={1} direction="column">
                <Grid xs={12}>
                    <Tabla onSelect={handleTableSelect}/>
                </Grid>
                <Grid container className={classes.rowSpacing} justify="center">
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                        <Button startIcon={<AddIcon />} onClick={() =>handleClickOpen(OPERACIONES_CATALOGO.ALTA)}>Alta</Button>
                        <Button startIcon={<EditIcon />} onClick={() =>handleClickOpen(OPERACIONES_CATALOGO.MODIFICACION)}>Modificación</Button>
                        <Button startIcon={<FindInPageIcon />} onClick={() =>handleClickOpen(OPERACIONES_CATALOGO.CONSULTA)}>Consulta</Button>
                        <Button startIcon={<DeleteIcon />}>Baja</Button>
                    </ButtonGroup>
                </Grid>
                <DialogGarantias mode={state.modo} opened={state.open} selected={state.selectedRowsBienesTabla} handleClose={handleClose}/>
            </Grid>
        </div>
    );
}
