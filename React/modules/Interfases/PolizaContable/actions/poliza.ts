import {
    MainPolizaActions,
    MainPolizaState,
    ITablePolizaParameters,
} from '../types';
import PolizaResultRow from '../models/PolizaResultRow';
import Movimientos from '../../../../models/Movimientos';
import { polizaApi } from '../services';
import { OperacionesCatalogo } from '../../../../constants';

type MainPolizaDispatcher = React.Dispatch<MainPolizaActions>;

async function fetchFullModel(
    selectedPolizaRow: PolizaResultRow | null
): Promise<Movimientos | null> {
    if (!selectedPolizaRow) {
        return null;
    }

    let poliza = new Movimientos(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    );

    return await polizaApi.findByPK(poliza);
}

function selectPolizaRow(selectedRow: PolizaResultRow) {
    return async (dispatch: MainPolizaDispatcher) => {
        dispatch({
            type: 'SELECT_POLIZA_RESULT_ROW',
            selectedRow: selectedRow,
        });
    };
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: MainPolizaDispatcher,
        getState: () => MainPolizaState
    ) => {
        const state = getState();
        const loadedModel = await fetchFullModel(state.Movimientos.selectedRow);

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_POLIZA_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_POLIZA_MODAL',
            mode: mode,
        });
    };
}

function newSearchPoliza(parameters: ITablePolizaParameters) {
    return async (dispatch: MainPolizaDispatcher) => {
        dispatch({
            type: 'SET_POLIZA_SEARCH_PARAMETERS',
            searchParameters: parameters,
        });

        await searchPoliza(dispatch, parameters);
    };
}

async function searchPoliza(
    dispatch: MainPolizaDispatcher,
    parameters: ITablePolizaParameters
) {
    const Poliza = await polizaApi.find(parameters);
    dispatch({
        type: 'SET_POLIZA_SEARCH_RESULTS',
        results: Poliza,
    });
}

async function repeatCurrentSearch(
    dispatch: MainPolizaDispatcher,
    getState: () => MainPolizaState
) {
    const state = getState();
    return await searchPoliza(dispatch, state.Movimientos.searchParameters);
}

function saveModel(model: Movimientos) {
    return async (
        dispatch: MainPolizaDispatcher,
        getState: () => MainPolizaState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_POLIZA_MODEL',
        });

        try {
            if (state.Movimientos.modalMode === OperacionesCatalogo.Alta) {
                await polizaApi.create(model);
            } else {
                await polizaApi.update(model);
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
        dispatch: MainPolizaDispatcher,
        getState: () => MainPolizaState
    ) => {
        const state = getState();

        if (!state.Movimientos.selectedRow) {
            return;
        }

        const model = polizaApi.getModelFromResultRow(
            state.Movimientos.selectedRow
        );
        await polizaApi.destroy(model);
        await repeatCurrentSearch(dispatch, getState);
    };
}

export default {
    selectPolizaRow,
    fetchAndDisplayModel,
    newSearchPoliza,
    saveModel,
    deleteSelectedModel,
};
