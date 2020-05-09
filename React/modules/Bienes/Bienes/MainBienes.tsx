import React, { useState } from 'react';

import { ITableBienesParameters } from './types';
import BienResultRow from './models/BienResultRow';
import TableBienes from './TableBienes';
import TableDetalleBienes from './TableDetalleBienes';
import DialogBienes from './DialogBienes';
import DialogDetalleBienes from './DialogDetalleBienes';
import { OPERACIONES_CATALOGO } from '../../../constants';
import { bienesApi } from './services';

const MainBienes: React.FC = () => {
    const [modoPantalla] = useState(OPERACIONES_CATALOGO.ALTA);
    const [bienesList, setBienesList] = useState<BienResultRow[]>([]);
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

    function handleSelectBien(selectedRows: BienResultRow[]) {
        setShowActionsDetalleBienes(selectedRows.length === 1);
    }

    function handleNewDetalleBien() {
        setModalDetalleBienesAbierto(true);
    }

    function handleSelectDetalleBien() {}

    async function searchBienes(params: ITableBienesParameters) {
        const bienes = await bienesApi.find(params);
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
            <TableDetalleBienes
                data={[]}
                showActionsHeader={showActionsDetalleBienes}
                onNew={handleNewDetalleBien}
                onSelect={handleSelectDetalleBien}
            />
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
};

export default MainBienes;
