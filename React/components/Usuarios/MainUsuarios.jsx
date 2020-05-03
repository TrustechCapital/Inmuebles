import React, { useState } from 'react';

import TableUsuarios from './TableUsuarios';
import DialogUsuarios from './DialogUsuarios';
import { OPERACIONES_CATALOGO } from '../../constantes.js';

export default function MainUsuarios() {
    const [modoPantalla, setModoPantalla] = useState(OPERACIONES_CATALOGO.ALTA);
    const [detalleAbierto, setDetalleAbierto] = useState(false);

    function handleCloseModal() {
        setDetalleAbierto(false);
    }

    function handleNewModel() {
        setDetalleAbierto(true);
    }

    return(
        <div>
            <TableUsuarios onNew={handleNewModel}/>
            <DialogUsuarios mode={modoPantalla} opened={detalleAbierto} handleClose={handleCloseModal}/>
        </div>
    );
}