import React, { useState } from 'react';

import TableAdquirientes from './TableAdquirientes';
import DialogAdquirientes from './DialogAdquirientes';
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
            <TableAdquirientes onNew={handleNewModel} />
            <DialogAdquirientes
                mode={modoPantalla}
                opened={detalleAbierto}
                handleClose={handleCloseModal}
            />
        </div>
    );
}
