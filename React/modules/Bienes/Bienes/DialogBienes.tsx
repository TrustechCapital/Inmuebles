import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ICatalogDialog } from '../../../types';
import { OperacionesCatalogo } from '../../../constants';
import { ClavesModuloBienes } from '../../../constants/bienes';

import Bien from '../../../models/Bien';
import GenericSwitch from '../../../sharedComponents/GenericSwitch';
import CatalogDialog from '../../../sharedComponents/CatalogDialog';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import GenericDatePicker from '../../../sharedComponents/GenericDatePicker';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const DialogBienes: React.FC<ICatalogDialog<Bien>> = ({
    mode,
    model,
    open,
    onClose,
    onSaveRequest,
    onModelFieldChange,
}) => {
    const classes = useStyles();

    const allFieldsDisabled = mode === OperacionesCatalogo.Consulta;
    const pkFieldsDisabled =
        allFieldsDisabled || mode === OperacionesCatalogo.Modificacion;

    return (
        <CatalogDialog
            opened={open}
            operacionCatalogo={mode.toString()}
            nombreCatalogo="Bienes"
            subtitle="Bienes por Fideicomisos"
            onCancel={onClose}
            onAccept={onSaveRequest}
        >
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Fideicomiso"
                            helperText="Fideicomiso a asignar bienes"
                            required={true}
                            disabled={pkFieldsDisabled}
                            value={model.idFideicomiso}
                            onChange={onModelFieldChange('idFideicomiso')}
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
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Sub-Fideicomiso"
                            helperText="SubFiso"
                            required={true}
                            disabled={pkFieldsDisabled}
                            value={model.idSubcuenta}
                            onChange={onModelFieldChange('idSubcuenta')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CatalogSelect
                            catalogId={ClavesModuloBienes.TiposDeBienes}
                            label="Tipo de Bien"
                            required={true}
                            disabled={allFieldsDisabled}
                            value={model.idTipoBien}
                            onChange={onModelFieldChange('idTipoBien')}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Importe de Bien"
                            disabled={allFieldsDisabled}
                            value={model.importeDelBien}
                            onChange={onModelFieldChange('importeDelBien')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Descripción"
                            disabled={allFieldsDisabled}
                            value={model.descripcion}
                            onChange={onModelFieldChange('descripcion')}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Importe Última Valuación"
                            disabled={allFieldsDisabled}
                            value={model.importeUltimaValuacion}
                            onChange={onModelFieldChange(
                                'importeUltimaValuacion'
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Comentario"
                            disabled={allFieldsDisabled}
                            value={model.comentario}
                            onChange={onModelFieldChange('comentario')}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            label="Fecha de Última Valuación"
                            disabled={allFieldsDisabled}
                            value={model.fechaUltimaValuacion}
                            onChange={onModelFieldChange(
                                'fechaUltimaValuacion'
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericSwitch
                            label="Revalua"
                            disabled={allFieldsDisabled}
                            checked
                            onChange={() => {}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericSwitch
                            label="¿Es Garantía?"
                            disabled={allFieldsDisabled}
                            checked={model.esGarantia}
                            onChange={onModelFieldChange('esGarantia')}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Importe Bien"
                            disabled={allFieldsDisabled}
                            required={true}
                            value={model.importeDeGarantia}
                            onChange={onModelFieldChange('importeDeGarantia')}
                            adornment="$"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericTextInput
                            label="Picnorado"
                            disabled={allFieldsDisabled}
                            required={true}
                            value={model.picnorado}
                            onChange={onModelFieldChange('picnorado')}
                            adornment="$"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <CatalogSelect
                            catalogId={
                                ClavesModuloBienes.PeriodicidadDeRevaluacion
                            }
                            label="Periodicidad"
                            disabled={allFieldsDisabled}
                            value={model.idClavePeriodicidadRevaluacion}
                            onChange={onModelFieldChange(
                                'idClavePeriodicidadRevaluacion'
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            label="Fecha de Inicio"
                            disabled={allFieldsDisabled}
                            value={model.fechaInicio}
                            onChange={onModelFieldChange('fechaInicio')}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.rowSpacing} spacing={3}>
                    <Grid item xs={6}>
                        <GenericDatePicker
                            label="Fecha de Salida"
                            disabled={allFieldsDisabled}
                            value={model.fechaFin}
                            onChange={onModelFieldChange('fechaFin')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CatalogSelect
                            catalogId={ClavesModuloBienes.Estatus}
                            useLabelAsValue={true}
                            label="Estatus"
                            disabled={allFieldsDisabled}
                            value={model.estatus}
                            onChange={onModelFieldChange('estatus')}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </CatalogDialog>
    );
};

export default DialogBienes;
