import {
    MainBienesActions,
    MainBienesState,
    ITableBienesParameters,
} from '../types';
import BienResultRow from '../models/BienResultRow';
import Bien from '../../../../models/Bien';
import { bienesApi, detalleBienesApi } from '../services';
import { OperacionesCatalogo } from '../../../../constants';

type MainBienesDispatcher = React.Dispatch<MainBienesActions>;

async function fetchFullModel(
    selectedBienesRow: BienResultRow | null
): Promise<Bien | null> {
    if (!selectedBienesRow) {
        return null;
    }

    let bien = new Bien(
        selectedBienesRow.idFideicomiso,
        selectedBienesRow.idSubcuenta,
        selectedBienesRow.idTipoBien
    );

    return await bienesApi.findByPK(bien);
}

function selectBienesRow(selectedRow: BienResultRow) {
    return async (dispatch: MainBienesDispatcher) => {
        const detalleBienesSearchResults = await detalleBienesApi.find(
            selectedRow
        );

        dispatch({
            type: 'SELECT_BIENES_RESULT_ROW',
            selectedRow: selectedRow,
            detalleBienesSearchResults: detalleBienesSearchResults,
        });
    };
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const loadedModel = await fetchFullModel(state.bienes.selectedRow);

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_BIEN_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_BIENES_MODAL',
            mode: mode,
        });
    };
}

function newSearchBienes(parameters: ITableBienesParameters) {
    return async (dispatch: MainBienesDispatcher) => {
        dispatch({
            type: 'SET_BIENES_SEARCH_PARAMETERS',
            searchParameters: parameters,
        });

        await searchBienes(dispatch, parameters);
    };
}

async function searchBienes(
    dispatch: MainBienesDispatcher,
    parameters: ITableBienesParameters
) {
    const bienes = await bienesApi.find(parameters);
    dispatch({
        type: 'SET_BIENES_SEARCH_RESULTS',
        results: bienes,
    });
}

async function repeatCurrentSearch(
    dispatch: MainBienesDispatcher,
    getState: () => MainBienesState
) {
    const state = getState();
    return await searchBienes(dispatch, state.bienes.searchParameters);
}

function saveModel(model: Bien) {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_BIEN_MODEL',
        });

        try {
            if (state.bienes.modalMode === OperacionesCatalogo.Alta) {
                await bienesApi.create(model);
            } else {
                await bienesApi.update(model);
            }

            dispatch({
                type: 'SET_MODEL_SAVE_SUCCESS',
            });

            repeatCurrentSearch(dispatch, getState);
        } catch (err) {
            dispatch({
                type: 'SET_MODEL_SAVE_ERROR',
                error: err.message,
            });
        }
    };
}

function deleteSelectedModel() {
    return async (
        dispatch: MainBienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();

        if (!state.bienes.selectedRow) {
            return;
        }

        const model = bienesApi.getModelFromResultRow(state.bienes.selectedRow);
        await bienesApi.destroy(model);
        await repeatCurrentSearch(dispatch, getState);
    };
}

export default {
    selectBienesRow,
    fetchAndDisplayModel,
    newSearchBienes,
    saveModel,
    deleteSelectedModel,
};
