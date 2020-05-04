import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

export default function MainBienes(props) {
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
                <GenericTable title='Bienes en garantía' data={[]} columns={COLUMNS_BIENES} showActionsHeader={showBienesGarantiaActions} onNew={handleNuevoBienEnGarantia}/>
            </Grid>
            <DialogGarantias mode={modoPantalla} opened={detalleAbierto} handleClose={handleCloseModal}/>
            <DialogBienesGarantias mode={modoPantalla} opened={detalleBienesGarantiasAbierto} handleClose={handleCloseModalBienesGarantias}/>
        </div>
    );
}
