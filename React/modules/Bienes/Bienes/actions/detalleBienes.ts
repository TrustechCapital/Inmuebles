import { MainBienesActions, MainBienesState } from '../types';
import { detalleBienesApi } from '../services';
import { OperacionesCatalogo } from '../../../../constants';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import DetalleBien from '../../../../models/DetalleBien';

type MainBienesDispatcher = React.Dispatch<MainBienesActions>;

async function fetchFullModel(
    resultRow: DetalleBienResultRow | null
): Promise<DetalleBien | null> {
    if (!resultRow) {
        return null;
    }

    let detalleBien = new DetalleBien(
        resultRow.idFideicomiso,
        resultRow.idSubcuenta,
        resultRow.idTipoBien,
        resultRow.idDetalleBien,
        resultRow.idTipoDetalleBien
    );

    return await detalleBienesApi.findByPK(detalleBien);
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const loadedModel = await fetchFullModel(
            state.detalleBienes.selectedRows[0]
        );

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_DETALLE_BIEN_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_DETALLE_BIENES_MODAL',
            mode: mode,
        });
    };
}

function saveModel(model: DetalleBien) {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_DETALLE_BIEN_MODEL',
        });

        try {
            if (state.bienes.modalMode === OperacionesCatalogo.Alta) {
                await detalleBienesApi.create(model);
            } else {
                await detalleBienesApi.update(model);
            }

            dispatch({
                type: 'SET_DETALLE_BIEN_MODEL_SAVE_SUCCESS',
            });
        } catch (err) {
            dispatch({
                type: 'SET_DETALLE_BIEN_MODEL_SAVE_ERROR',
                error: err.message,
            });
        }
    };
}

export default {
    fetchAndDisplayModel,
    saveModel,
};
