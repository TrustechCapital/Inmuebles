import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CargaMasivasBienes from './models/CargaMasivaBienes';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';
import { Formik } from 'formik';
import GenericForm from '../../../sharedComponents/Forms';
import { GenericRadioGroupItem } from '../../../sharedComponents/GenericRadioGroup';
import { TiposCargaMasivaBienes } from './constants';

const { FormTextField, FormFileField, FormRadioGroupField } = new GenericForm<
    CargaMasivasBienes
>();

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        margin: '0 auto',
    },
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

const CargasMasivasFormValidator = new FormValidator({
    idFideicomiso: ValidationHelpers.validateFideicomiso,
    tipoCarga: ValidationHelpers.validateRequiredNumber('Tipo carga'),
    file: ValidationHelpers.validateFile('Archivo de carga'),
});

const initialValues = new CargaMasivasBienes(null, null, null);

export default function MainCargaMasiva() {
    const classes = useStyles();

    function handleSubmit(datosCargaMasiva: CargaMasivasBienes) {
        console.log(datosCargaMasiva);
        debugger;
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={CargasMasivasFormValidator.validationSchema}
        >
            {(props) => (
                <form className={classes.root} onSubmit={props.handleSubmit}>
                    <Paper elevation={3} className={classes.paper}>
                        <Grid container spacing={1} direction="column">
                            <Grid
                                container
                                className={classes.rowSpacing}
                                spacing={4}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div">
                                        Carga Masiva
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className={classes.rowSpacing}
                                spacing={4}
                            >
                                <Grid item xs={4}>
                                    <FormTextField
                                        name="idFideicomiso"
                                        label="Num. Fideicomiso"
                                        dataType="number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4} />
                            </Grid>
                            <Grid
                                container
                                className={classes.rowSpacing}
                                spacing={4}
                            >
                                <Grid item xs={12}>
                                    <FormRadioGroupField
                                        name="tipoCarga"
                                        label="Tipo de carga"
                                    >
                                        <GenericRadioGroupItem
                                            value={TiposCargaMasivaBienes.Indovidualiacion.toString()}
                                            label="Individualización Inmuebles"
                                        />
                                        <GenericRadioGroupItem
                                            value={TiposCargaMasivaBienes.Liberacion.toString()}
                                            label="Liberación"
                                        />
                                    </FormRadioGroupField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className={classes.rowSpacing}
                                spacing={4}
                            >
                                <Grid item xs={12}>
                                    <FormFileField name="file" />
                                </Grid>
                            </Grid>
                            <Grid container justify="flex-end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Aplicar
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            )}
        </Formik>
    );
}
