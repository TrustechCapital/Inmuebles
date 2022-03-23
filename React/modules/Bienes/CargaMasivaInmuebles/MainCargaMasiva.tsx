import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BackupIcon from '@material-ui/icons/Backup';

import CargaMasivasBienes from './models/CargaMasivaBienes';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';
import { Formik } from 'formik';
import GenericForm from '../../../sharedComponents/Forms';
import { GenericRadioGroupItem } from '../../../sharedComponents/GenericRadioGroup';
import { TiposCargaMasivaBienes } from './constants';
import { cargaMasivaBienesApi } from './services/CargaMasivaBienesApi';
import SavingButton from '../../../sharedComponents/SavingButton';
import ErrorMessage from '../../../sharedComponents/ErrorMessage';

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

const initialOperationStatus = {
    isInitialState: true,
    isSaving: false,
    error: null,
};

export default function MainCargaMasiva() {
    const classes = useStyles();
    const [operationStatus, setOperationStatus] = useState(
        initialOperationStatus
    );

    const operationSuccess = !operationStatus.isInitialState && operationStatus.error === null;

    async function handleSubmit(datosCargaMasiva: CargaMasivasBienes) {
        try {
            setOperationStatus({
                isInitialState: false,
                isSaving: true,
                error: null,
            });

            await cargaMasivaBienesApi.aplicaCargaMasiva(datosCargaMasiva);
            
            setOperationStatus({
                isInitialState: false,
                isSaving: false,
                error: null,
            });

        } catch (error) {
            setOperationStatus({
                isInitialState: false,
                isSaving: false,
                error: null,
            });
        }
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
                                <ErrorMessage message=""/>
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
