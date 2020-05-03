import React, { useState } from 'react';

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

export default function MainBienes(props) {
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
            <GenericTable title='Bienes en garantía' data={[]} columns={COLUMNS_BIENES} onSelect={props.onSelect} showActionsHeader={false}/>
            <DialogGarantias mode={modoPantalla} opened={detalleAbierto} handleClose={handleCloseModal}/>
        </div>
    );
}
