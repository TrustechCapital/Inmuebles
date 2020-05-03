import React, { useState } from 'react';

import TableIndividualizaciones from './TableIndividualizaciones';
import DialogIndivizualizacion from './DialogIndividualizacion';
import { OPERACIONES_CATALOGO } from '../../constantes.js';

export default function MainIndividualizacion() {
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
            <TableIndividualizaciones onNew={handleNewModel}/>
            <DialogIndivizualizacion mode={modoPantalla} opened={detalleAbierto} handleClose={handleCloseModal}/>
        </div>
    );
}