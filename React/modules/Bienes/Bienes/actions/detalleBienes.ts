import {
    MainBienesActions,
    MainBienesState,
    RevaluacionDetalleBien,
} from '../types';
import { detalleBienesApi } from '../services';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import DetalleBien from '../../../../models/DetalleBien';
import { OperacionesCatalogoDetalleBienes } from '../constants';
import BienResultRow from '../models/BienResultRow';
import { requestConfirmation } from '../../../../sharedComponents/ConfirmationModal';

type MainBienesDispatcher = React.Dispatch<MainBienesActions>;

async function repeatCurrentSearch(
    dispatch: MainBienesDispatcher,
    getState: () => MainBienesState
) {
    const state = getState();
    const detalleBienesSearchResults = await detalleBienesApi.find(
        state.bienes.selectedRow as BienResultRow
    );

    dispatch({
        type: 'SET_DETALLE_BIENES_SEARCH_RESULTS',
        results: detalleBienesSearchResults,
    });
}

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

        const newCurrentModel = new DetalleBien(
            currentBienModel.idFideicomiso,
            currentBienModel.idSubcuenta,
            currentBienModel.idTipoBien,
            null,
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

function saveModel(
    model: DetalleBien,
    revaluacionDetalleBien?: RevaluacionDetalleBien
) {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const mode = state.detalleBienes.modalMode;
        dispatch({
            type: 'SAVE_DETALLE_BIEN_MODEL',
        });

        try {
            if (mode === OperacionesCatalogoDetalleBienes.Registro) {
                const newModelId = await detalleBienesApi.executeCrudOperation(
                    model,
                    mode
                );
                model.idDetalleBien = newModelId;

                dispatch({
                    type: 'SET_DETALLE_BIEN_MODEL',
                    model: model,
                });
            } else {
                await detalleBienesApi.executeCrudOperation(
                    model,
                    mode,
                    revaluacionDetalleBien
                );
            }

            dispatch({
                type: 'SET_DETALLE_BIEN_MODEL_SAVE_SUCCESS',
            });

            repeatCurrentSearch(dispatch, getState);
        } catch (err) {
            dispatch({
                type: 'SET_DETALLE_BIEN_MODEL_SAVE_ERROR',
                error: err.message,
            });
        }
    };
}

function deleteSelectedModels() {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const selectedRows = state.detalleBienes.selectedRows;

        if (!selectedRows.length) {
            return;
        }

        const confirmed = await requestConfirmation({
            title: `Esta seguro de continuar?`,
            bodyText: `Esta a punto de eliminar eliminar ${selectedRows.length} registros. Esta operacion no se puede revertir.`,
        });

        if (!confirmed) {
            return;
        }

        const models = selectedRows.map((selectedRow) => {
            return new DetalleBien(
                selectedRow.idFideicomiso,
                selectedRow.idSubcuenta,
                selectedRow.idTipoBien,
                selectedRow.idDetalleBien,
                selectedRow.idTipoDetalleBien
            );
        });

        await detalleBienesApi.executeMultipleDeleteOperation(models);
        await repeatCurrentSearch(dispatch, getState);
    };
}

export default {
    newDetalleBienes,
    fetchAndDisplayModel,
    saveModel,
    deleteSelectedModels,
};
