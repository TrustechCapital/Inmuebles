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

import TableBienes from './TableBienes';
import DialogBienes from './DialogBienes';
import DialogDetalleBienes from './DialogDetalleBienes';
import GenericTable from '../../../sharedComponents/GenericTable';
import { OPERACIONES_CATALOGO } from '../../../constants';
import { bienesApi } from './services';

const COLUMNS_DETALLE_BIENES = [
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

const ActionsDetalleBienes = (props) => {
    const bienesSeleccionados = 1;

    return (
        <React.Fragment>
            {bienesSeleccionados > 0 ? (
                <Tooltip title="Salida de bien">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
                <Tooltip title="Reevaluación">
                    <IconButton>
                        <MonetizationOnIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
                <Tooltip title="Modificar">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
                <Tooltip title="Consultar">
                    <IconButton>
                        <FindInPageIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
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
    const [bienesList, setBienesList] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(false);
    const [modalDetalleBienesAbierto, setModalDetalleBienesAbierto] = useState(
        false
    );

    const [showActionsDetalleBienes, setShowActionsDetalleBienes] = useState(
        false
    );

    function handleCloseModal() {
        setDetalleAbierto(false);
    }

    function handleCloseModalDetalleBienes() {
        setModalDetalleBienesAbierto(false);
    }

    function handleNewBien() {
        setDetalleAbierto(true);
    }

    function handleSelectBien(selectedRows) {
        setShowActionsDetalleBienes(selectedRows.length === 1);
    }

    function handleNewDetalleBien() {
        setModalDetalleBienesAbierto(true);
    }

    function handleSelectDetalleBien() {}

    async function searchBienes({ params }) {
        let { idFideicomiso } = params;

        //TODO: manejar tipo de dato desde los componentes
        if (idFideicomiso !== null && idFideicomiso.trim() !== '') {
            idFideicomiso = parseInt(idFideicomiso, 10);
        }

        const bienes = await bienesApi.find({
            ...params,
            idFideicomiso: idFideicomiso,
        });
        setBienesList(bienes);
    }

    return (
        <div>
            <TableBienes
                data={bienesList}
                onNew={handleNewBien}
                onSelect={handleSelectBien}
                onSearch={searchBienes}
            />
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <GenericTable
                    title="Detalle de bienes"
                    data={[]}
                    columns={COLUMNS_DETALLE_BIENES}
                    showActionsHeader={showActionsDetalleBienes}
                    onNew={handleNewDetalleBien}
                    onSelect={handleSelectDetalleBien}
                    actionsComponent={ActionsDetalleBienes}
                />
            </Grid>
            <DialogBienes
                mode={modoPantalla}
                opened={detalleAbierto}
                handleClose={handleCloseModal}
            />
            <DialogDetalleBienes
                mode={modoPantalla}
                opened={modalDetalleBienesAbierto}
                handleClose={handleCloseModalDetalleBienes}
            />
        </div>
    );
}
