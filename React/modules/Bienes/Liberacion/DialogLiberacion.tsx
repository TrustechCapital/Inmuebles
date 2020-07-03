import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Liberacion from '../../../models/Individualizacion';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import GenericForm from '../../../sharedComponents/Forms';
import FormValidator, {
    ValidationHelpers,
} from '../../../services/FormValidator';

const { FormTextField, FormDatePickerField } = new GenericForm<Liberacion>();

//TODO: Usar estilos genericos
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const LiberacionesFormValidator = new FormValidator<Liberacion>({
    idFideicomiso: ValidationHelpers.validateFideicomiso,
    idSubcuenta: ValidationHelpers.validateSubcuenta,
    idBien: ValidationHelpers.validateInmueble,
    idEdificio: ValidationHelpers.validateEdificio,
    idDepto: ValidationHelpers.validateDepto,
});

const DialogLiberacion: React.FC<ICatalogDialog<Liberacion>> = ({
    mode,
    model,
    open,
    errorMessage,
    savingStatus,
    onClose,
    onSaveRequest,
}) => {
    const classes = useStyles();

    const allFieldsDisabled = mode === OperacionesCatalogo.Consulta;
    const pkFieldsDisabled =
        allFieldsDisabled || mode === OperacionesCatalogo.Modificacion;

    return (
        <Formik
            initialValues={model}
            onSubmit={onSaveRequest}
            enableReinitialize={true}
            validationSchema={LiberacionesFormValidator.validationSchema}
        >
            {(props) => (
                <CatalogDialog
                    opened={open}
                    operacionCatalogo={mode}
                    nombreCatalogo="Liberaciones"
                    subtitle="Liberaciones por Fideicomisos"
                    onCancel={() => {
                        props.resetForm();
                        onClose();
                    }}
                    onAccept={props.handleSubmit}
                    errorMessage={errorMessage}
                    saving={savingStatus === SavingStatus.Saving}
                    success={savingStatus === SavingStatus.Success}
                >
                    <Grid
                        container
                        spacing={1}
                        direction="column"
                        className={classes.rowSpacing}
                    >
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idFideicomiso"
                                    label="Fideicomiso"
                                    helperText="Fideicomiso a asignar bienes"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GenericTextInput
                                    label="Nombre de Fideicomiso"
                                    readOnly={true}
                                    value=""
                                    onChange={() => {}}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idBien"
                                    label="Número de Bien"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idSubcuenta"
                                    label="Sub Cuenta"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idEdificio"
                                    label="Nombre del Adquiriente"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="idDepto"
                                    label="Nombre del Notario"
                                    disabled={pkFieldsDisabled}
                                    dataType="number"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <FormTextField
                                    name="niveles"
                                    label="Valor de la Operacion"
                                    dataType="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormDatePickerField
                                    name="fechaTrasladoDominio"
                                    label="Fecha de la escrituracion"
                                    disabled={allFieldsDisabled}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CatalogDialog>
            )}
        </Formik>
    );
};

export default DialogLiberacion;
