import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Tooltip from '@material-ui/core/Tooltip';

import TableGarantias from './TableGarantias';
import DialogGarantias from './DialogGarantias';
import DialogBienesGarantias from './DialogBienesGar';
import GenericTable from '../commons/GenericTable';
import { OPERACIONES_CATALOGO } from '../../constantes.js';

const COLUMNS_BIENES = [
    { field: 'fgrsIdFideicomiso', header: 'Fideicomiso', isKey: true},
    { field: 'forsCveTipoBien', header: 'Clasificacion'},
    { field: 'forsImpUltValua', header: 'Importe Ult. Valuación', numeric: true},
    { field: 'forsTextoDescrip', header: 'Descripción'}
]

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2)
    } 
}));

const ActionsBienesEnGarantia = (props) => {
    const numSelected = 1;
    return (
        <React.Fragment>
            {numSelected > 0 ? (
            <Tooltip title="Salida de bien">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Reevaluación">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Modificar">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Consultar">
                    <IconButton>
                        <FindInPageIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 0 ? (
                <Tooltip title="Registro de bien">
                    <IconButton color="primary" onClick={props.onNew}>
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
    const [detalleAbierto, setDetalleAbierto] = useState(false);
    const [detalleBienesGarantiasAbierto, setDetalleBienesGarantiasAbierto] = useState(false);
    const [showBienesGarantiaActions, setShowBienesGarantiaActions] = useState(false);
    

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

    return(
        <div>
            <TableGarantias onNew={handleNuevaGarantia} onSelect={handleSelectGarantia}/>
            <Grid container spacing={1} direction="column" className={classes.rowSpacing}>
                <GenericTable title='Bienes en garantía' data={[]} columns={COLUMNS_BIENES} showActionsHeader={showBienesGarantiaActions} onNew={handleNuevoBienEnGarantia} actionsComponent={ActionsBienesEnGarantia}/>
            </Grid>
            <DialogGarantias mode={modoPantalla} opened={detalleAbierto} handleClose={handleCloseModal}/>
            <DialogBienesGarantias mode={modoPantalla} opened={detalleBienesGarantiasAbierto} handleClose={handleCloseModalBienesGarantias}/>
        </div>
    );
}
