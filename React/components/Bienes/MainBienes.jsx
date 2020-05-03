import React from 'react';

import TableGarantias from './TableGarantias';
import DialogGarantias from './DialogGarantias';
import GenericTable from '../commons/GenericTable';

const COLUMNS_BIENES = [
    { field: 'fgrsIdFideicomiso', header: 'Fideicomiso', isKey: true},
    { field: 'forsCveTipoBien', header: 'Clasificacion'},
    { field: 'forsImpUltValua', header: 'Importe Ult. Valuación', numeric: true},
    { field: 'forsTextoDescrip', header: 'Descripción'}
]

export default function MainBienes(props) {
    return(
        <div>
            <TableGarantias/>
            <GenericTable title='Bienes en garantía' data={[]} columns={COLUMNS_BIENES} onSelect={props.onSelect} showActionsHeader={false}/>
            <DialogGarantias/>
        </div>
    );
}
