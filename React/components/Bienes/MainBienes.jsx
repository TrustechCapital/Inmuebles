import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TableGarantias from './TableGarantias';
import DialogGarantias from './DialogGarantias';
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

    function handleCloseModal() {
        setDetalleAbierto(false);
    }

    function handleNuevaGarantia() {
        setDetalleAbierto(true);
    }

    return(
        <div>
            <TableGarantias onNew={handleNuevaGarantia}/>
            <Grid container spacing={1} direction="column" className={classes.rowSpacing}>
                <GenericTable title='Bienes en garantía' data={[]} columns={COLUMNS_BIENES} onSelect={props.onSelect} showActionsHeader={false}/>
            </Grid>
            <DialogGarantias mode={modoPantalla} opened={detalleAbierto} handleClose={handleCloseModal}/>
        </div>
    );
}
