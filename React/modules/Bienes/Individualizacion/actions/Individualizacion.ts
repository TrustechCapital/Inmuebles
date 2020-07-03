import {
    MainIndividualizacionesActions,
    MainIndividualizacionesState,
    ITableIndividualizacionesParameters,
} from '../types';
import IndividualizacionResultRow from '../models/IndividualizacionesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import { individualizacionesApi } from '../services';
import { OperacionesCatalogo } from '../../../../constants';

type MainIndividualizacionesDispatcher = React.Dispatch<
    MainIndividualizacionesActions
>;

async function fetchFullModel(
    selectedIndividualizacionesRow: IndividualizacionResultRow | null
): Promise<Individualizacion | null> {
    if (!selectedIndividualizacionesRow) {
        return null;
    }

    let individualizacion = new Individualizacion(
        selectedIndividualizacionesRow.idFideicomiso,
        selectedIndividualizacionesRow.idSubcuenta,
        selectedIndividualizacionesRow.idBien,
        selectedIndividualizacionesRow.idEdificio,
        selectedIndividualizacionesRow.idDepto
    );

    return await individualizacionesApi.findByPK(individualizacion);
}

function selectIndividualizacionesRow(selectedRow: IndividualizacionResultRow) {
    return async (dispatch: MainIndividualizacionesDispatcher) => {
        dispatch({
            type: 'SELECT_INDIVIDUALIZACIONES_RESULT_ROW',
            selectedRow: selectedRow,
        });
    };
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: MainIndividualizacionesDispatcher,
        getState: () => MainIndividualizacionesState
    ) => {
        const state = getState();
        const loadedModel = await fetchFullModel(
            state.Individualizaciones.selectedRow
        );

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_INDIVIDUALIZACIONES_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_INDIVIDUALIZACIONES_MODAL',
            mode: mode,
        });
    };
}

function newSearchIndividualizaciones(
    parameters: ITableIndividualizacionesParameters
) {
    return async (dispatch: MainIndividualizacionesDispatcher) => {
        dispatch({
            type: 'SET_INDIVIDUALIZACIONES_SEARCH_PARAMETERS',
            searchParameters: parameters,
        });

        await searchIndividualizaciones(dispatch, parameters);
    };
}

async function searchIndividualizaciones(
    dispatch: MainIndividualizacionesDispatcher,
    parameters: ITableIndividualizacionesParameters
) {
    const Individualizaciones = await individualizacionesApi.find(parameters);
    dispatch({
        type: 'SET_INDIVIDUALIZACIONES_SEARCH_RESULTS',
        results: Individualizaciones,
    });
}

async function repeatCurrentSearch(
    dispatch: MainIndividualizacionesDispatcher,
    getState: () => MainIndividualizacionesState
) {
    const state = getState();
    return await searchIndividualizaciones(
        dispatch,
        state.Individualizaciones.searchParameters
    );
}

function saveModel(model: Individualizacion) {
    return async (
        dispatch: MainIndividualizacionesDispatcher,
        getState: () => MainIndividualizacionesState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_INDIVIDUALIZACIONES_MODEL',
        });

        try {
            if (
                state.Individualizaciones.modalMode === OperacionesCatalogo.Alta
            ) {
                await individualizacionesApi.create(model);
            } else {
                await individualizacionesApi.update(model);
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
        dispatch: MainIndividualizacionesDispatcher,
        getState: () => MainIndividualizacionesState
    ) => {
        const state = getState();

        if (!state.Individualizaciones.selectedRow) {
            return;
        }

        const model = individualizacionesApi.getModelFromResultRow(
            state.Individualizaciones.selectedRow
        );
        await individualizacionesApi.destroy(model);
        await repeatCurrentSearch(dispatch, getState);
    };
}

export default {
    selectIndividualizacionesRow,
    fetchAndDisplayModel,
    newSearchIndividualizaciones,
    saveModel,
    deleteSelectedModel,
};
