import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BackupIcon from '@material-ui/icons/Backup';

import EjecutorPlanes from './models/EjecutorPlanes';
import { Formik } from 'formik';
import GenericForm from '../../sharedComponents/Forms';
import { ejecutorPlanesApi } from './services/EjecutorApi';
import SavingButton from '../../sharedComponents/SavingButton';

const { FormSelectField, FormDatePickerField } = new GenericForm<
    EjecutorPlanes
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

const initialValues = new EjecutorPlanes(null, null, null);

const initialOperationStatus = {
    isSaving: false,
    error: null,
};

export default function MainCargaMasiva() {
    const classes = useStyles();
    const [operationStatus, setOperationStatus] = useState(
        initialOperationStatus
    );

    const operationSuccess = !!operationStatus.error;

    async function handleSubmit(datosPlanes: EjecutorPlanes) {
        try {
            setOperationStatus({
                isSaving: true,
                error: null,
            });
            await ejecutorPlanesApi.aplicaPlan(datosPlanes);
            setOperationStatus({
                isSaving: false,
                error: null,
            });
        } catch (error) {
            setOperationStatus({
                isSaving: false,
                error: error,
            });
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                                        Ejecutor de Planes
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className={classes.rowSpacing}
                                spacing={4}
                            >
                                <Grid item xs={4}>
                                    <FormDatePickerField
                                        namespace="model"
                                        name="fecha"
                                        label="Fecha de Ejecucion"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="flex-end">
                                <SavingButton
                                    type="submit"
                                    loading={operationStatus.isSaving}
                                    success={operationSuccess}
                                    disabled={operationStatus.isSaving}
                                    startIcon={<BackupIcon />}
                                >
                                    Aplicar
                                </SavingButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            )}
        </Formik>
    );
}
