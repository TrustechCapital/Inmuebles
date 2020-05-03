import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
export default function DialogLiberaciones(props){
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
        <CatalogDialog opened={props.opened} operacionCatalogo={mode} nombreCatalogo="Individualización" subtitle="Individualización de Inmuebles (Unidades Condominales)" onCancel={props.handleClose} onAccept={handleAccept}>
            <Grid container spacing={1} direction="column" className={classes.rowSpacing}>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Fideicomiso' idCampo='funiIdFideicomiso' required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Número de Inmueble' idCampo='funiIdBien'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='SubCuenta' idCampo='funiIdSubcuenta'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Edificio' idCampo='funiIdSubcuenta'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Unidad Condominal' idCampo='funiIdDepto'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Niveles' idCampo='funiNiveles'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Calle' idCampo='funiCalleNum'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Colonia' idCampo='funiNomColonia'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Población' idCampo='funiNomPoblacion'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Código Postal' idCampo='funiCodigoPostal'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect labelId='País' label='País' selectId='funiNumPais' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect labelId='Estado' label='Estado' selectId='funiNumEstado' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Estacionamiento 1' idCampo='funiEstacionamiento1'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Estacionamiento 2' idCampo='funiEstacionamiento2'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Estacionamiento 3' idCampo='funiEstacionamiento3'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Otro' idCampo='funiRoofGarden'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Superficie Otro' idCampo='funiRoofSuperficie'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Otro 2' idCampo='funiSotano'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Superficie Otro 2' idCampo='funiSotanoSuperficie'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Indiviso' idCampo='funiIndiviso'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Registro Contable' idCampo='funiPrecio'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Precio Catastro' idCampo='funiPrecioCatastro'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSelect labelId='Moneda' label='Moneda' selectId='funiMoneda' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSelect labelId='Estatus' label='Estatus' selectId='funiStatus' selected={state.periodicidad} onChange={handleChangePeriodi}  /> 
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Acto 1' idCampo='funiActo1'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Acto 2' idCampo='funiActo2'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Acto 3' idCampo='funiActo3'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Acto 4' idCampo='funiActo4'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Notario' idCampo='funiNotario'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput label='Escritura' idCampo='funiNumEscritura'  required={true} defaultVal=''/>
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput label='Folio' idCampo='funiFolioReal'  required={true} defaultVal=''/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenericDatePicker idSelector='funiFechaTrasladoDominio' labelSelector='Fecha Traslativo' selectedDate={selectedDate} onChange={handleDateChangeSal}/> 
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericDatePicker idSelector='funiFechaReversion' labelSelector='Fecha Reversión' selectedDate={selectedDate} onChange={handleDateChangeSal}/> 
                    </Grid>
                </Grid>
            </Grid>
        </CatalogDialog>
    );
}
