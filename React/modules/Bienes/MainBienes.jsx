import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Tooltip from '@material-ui/core/Tooltip';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import TableGarantias from './TableGarantias';
import DialogGarantias from './DialogGarantias';
import DialogBienesGarantias from './DialogBienesGar';
import GenericTable from '../../sharedComponents/GenericTable';
import { OPERACIONES_CATALOGO } from '../../constants';
import { garantiasApi } from './services';

const COLUMNS_BIENES = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'fgrsIdFideicomiso', header: 'Fideicomiso' },
    { field: 'forsCveTipoBien', header: 'Clasificacion' },
    {
        field: 'forsImpUltValua',
        header: 'Importe Ult. Valuación',
        numeric: true,
    },
    { field: 'forsTextoDescrip', header: 'Descripción' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const ActionsBienesEnGarantia = (props) => {
    const garantiasSeleccionadas = 1;

    return (
        <React.Fragment>
            {garantiasSeleccionadas > 0 ? (
                <Tooltip title="Salida de bien">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {garantiasSeleccionadas == 1 ? (
                <Tooltip title="Reevaluación">
                    <IconButton>
                        <MonetizationOnIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {garantiasSeleccionadas == 1 ? (
                <Tooltip title="Modificar">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {garantiasSeleccionadas == 1 ? (
                <Tooltip title="Consultar">
                    <IconButton>
                        <FindInPageIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {garantiasSeleccionadas == 1 ? (
                <Tooltip title="Registro de bien">
                    <IconButton onClick={props.onNew}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </React.Fragment>
    );
};

export default function MainBienes() {
    const classes = useStyles();
    const [modoPantalla, setModoPantalla] = useState(OPERACIONES_CATALOGO.ALTA);
    const [garantiasList, setGarantiasList] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(false);
    const [
        detalleBienesGarantiasAbierto,
        setDetalleBienesGarantiasAbierto,
    ] = useState(false);

    const [showBienesGarantiaActions, setShowBienesGarantiaActions] = useState(
        false
    );

    function handleCloseModal() {
        setDetalleAbierto(false);
    }

    function handleCloseModalBienesGarantias() {
        setDetalleBienesGarantiasAbierto(false);
    }

    function handleNuevaGarantia() {
        setDetalleAbierto(true);
    }

    function handleSelectGarantia(selectedRows) {
        setShowBienesGarantiaActions(selectedRows.length === 1);
    }

    function handleNuevoBienEnGarantia() {
        setDetalleBienesGarantiasAbierto(true);
    }

    async function searchGarantias({ params }) {
        let { idFideicomiso } = params;

        //TODO: manejar tipo de dato desde los componentes
        if (idFideicomiso.trim() !== '') {
            idFideicomiso = parseInt(idFideicomiso, 10);
        }

        const garantias = await garantiasApi.find({
            ...params,
            idFideicomiso: idFideicomiso,
        });
        setGarantiasList(garantias);
    }

    return (
        <div>
            <TableGarantias
                data={garantiasList}
                onNew={handleNuevaGarantia}
                onSelect={handleSelectGarantia}
                onSearch={searchGarantias}
            />
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <GenericTable
                    title="Bienes en garantía"
                    data={[]}
                    columns={COLUMNS_BIENES}
                    showActionsHeader={showBienesGarantiaActions}
                    onNew={handleNuevoBienEnGarantia}
                    actionsComponent={ActionsBienesEnGarantia}
                />
            </Grid>
            <DialogGarantias
                mode={modoPantalla}
                opened={detalleAbierto}
                handleClose={handleCloseModal}
            />
            <DialogBienesGarantias
                mode={modoPantalla}
                opened={detalleBienesGarantiasAbierto}
                handleClose={handleCloseModalBienesGarantias}
            />
        </div>
    );
}
