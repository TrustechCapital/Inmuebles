import { MainBienesActions, MainBienesState } from '../types';
import { detalleBienesApi } from '../services';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import DetalleBien from '../../../../models/DetalleBien';
import { OperacionesCatalogoDetalleBienes } from '../constants';

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

function newDetalleBienes() {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const currentBienModel = state.bienes.currentModel;

        const nextDetalleBienId = await detalleBienesApi.getNextId(
            currentBienModel.idFideicomiso as number,
            currentBienModel.idSubcuenta as number,
            currentBienModel.idTipoBien as number
        );

        const newCurrentModel = new DetalleBien(
            currentBienModel.idFideicomiso,
            currentBienModel.idSubcuenta,
            currentBienModel.idTipoBien,
            nextDetalleBienId,
            null
        );

        dispatch({
            type: 'OPEN_NEW_DETALLE_BIENES_MODAL',
            mode: OperacionesCatalogoDetalleBienes.Registro,
            newModel: newCurrentModel,
        });
    };
}
function fetchAndDisplayModel(mode: OperacionesCatalogoDetalleBienes) {
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
            if (
                state.detalleBienes.modalMode ===
                OperacionesCatalogoDetalleBienes.Registro
            ) {
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
    newDetalleBienes,
    fetchAndDisplayModel,
    saveModel,
};
