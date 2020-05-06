import React, { useState } from 'react';

import TableLiberaciones from './TableLiberaciones';
import DialogLiberacion from './DialogLiberacion';
import { OPERACIONES_CATALOGO } from '../../constants';

export default function MainAdquirientes() {
    const [modoPantalla, setModoPantalla] = useState(OPERACIONES_CATALOGO.ALTA);
    const [detalleAbierto, setDetalleAbierto] = useState(false);

    function handleCloseModal() {
        setDetalleAbierto(false);
    }

    function handleNewModel() {
        setDetalleAbierto(true);
    }

    return (
        <div>
            <TableLiberaciones onNew={handleNewModel} />
            <DialogLiberacion
                mode={modoPantalla}
                opened={detalleAbierto}
                handleClose={handleCloseModal}
            />
        </div>
    );
}
