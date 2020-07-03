import {
    MainLiberacionesActions,
    MainLiberacionesState,
    ITableLiberacionesParameters,
} from '../types';
import LiberacionResultRow from '../models/LiberacionResultRow';
import Liberacion from '../../../../models/Individualizacion';
import { liberacionesApi } from '../services';
import { OperacionesCatalogo } from '../../../../constants';

type MainLiberacionesDispatcher = React.Dispatch<MainLiberacionesActions>;

async function fetchFullModel(
    selectedLiberacionesRow: LiberacionResultRow | null
): Promise<Liberacion | null> {
    if (!selectedLiberacionesRow) {
        return null;
    }

    let liberacion = new Liberacion(
        selectedLiberacionesRow.idFideicomiso,
        selectedLiberacionesRow.idSubcuenta,
        selectedLiberacionesRow.idBien,
        selectedLiberacionesRow.idEdificio,
        selectedLiberacionesRow.idDepto
    );

    return await liberacionesApi.findByPK(liberacion);
}

function selectLiberacionesRow(selectedRow: LiberacionResultRow) {
    return async (dispatch: MainLiberacionesDispatcher) => {
        dispatch({
            type: 'SELECT_LIBERACIONES_RESULT_ROW',
            selectedRow: selectedRow,
        });
    };
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: MainLiberacionesDispatcher,
        getState: () => MainLiberacionesState
    ) => {
        const state = getState();
        const loadedModel = await fetchFullModel(
            state.Liberaciones.selectedRow
        );

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_LIBERACIONES_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_LIBERACIONES_MODAL',
            mode: mode,
        });
    };
}

function newSearchLiberaciones(parameters: ITableLiberacionesParameters) {
    return async (dispatch: MainLiberacionesDispatcher) => {
        dispatch({
            type: 'SET_LIBERACIONES_SEARCH_PARAMETERS',
            searchParameters: parameters,
        });

        await searchLiberaciones(dispatch, parameters);
    };
}

async function searchLiberaciones(
    dispatch: MainLiberacionesDispatcher,
    parameters: ITableLiberacionesParameters
) {
    const Liberaciones = await liberacionesApi.find(parameters);
    dispatch({
        type: 'SET_LIBERACIONES_SEARCH_RESULTS',
        results: Liberaciones,
    });
}

async function repeatCurrentSearch(
    dispatch: MainLiberacionesDispatcher,
    getState: () => MainLiberacionesState
) {
    const state = getState();
    return await searchLiberaciones(
        dispatch,
        state.Liberaciones.searchParameters
    );
}

function saveModel(model: Liberacion) {
    return async (
        dispatch: MainLiberacionesDispatcher,
        getState: () => MainLiberacionesState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_LIBERACIONES_MODEL',
        });

        try {
            if (state.Liberaciones.modalMode === OperacionesCatalogo.Alta) {
                await liberacionesApi.create(model);
            } else {
                await liberacionesApi.update(model);
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
        dispatch: MainLiberacionesDispatcher,
        getState: () => MainLiberacionesState
    ) => {
        const state = getState();

        if (!state.Liberaciones.selectedRow) {
            return;
        }

        const model = liberacionesApi.getModelFromResultRow(
            state.Liberaciones.selectedRow
        );
        await liberacionesApi.destroy(model);
        await repeatCurrentSearch(dispatch, getState);
    };
}

export default {
    selectLiberacionesRow,
    fetchAndDisplayModel,
    newSearchLiberaciones,
    saveModel,
    deleteSelectedModel,
};
