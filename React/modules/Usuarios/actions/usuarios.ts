import {
    MainUsuariosActions,
    MainUsuariosState,
    ITableUsuariosParameters,
} from '../types';
import UsuariosResultRow from '../models/UsuariosResultRow';
import Usuarios from '../../../models/Usuarios';
import { usuariosApi } from '../services';
import { OperacionesCatalogo } from '../../../constants';

type MainUsuariosDispatcher = React.Dispatch<MainUsuariosActions>;

async function fetchFullModel(
    selectedUsuariosRow: UsuariosResultRow | null
): Promise<Usuarios | null> {
    if (!selectedUsuariosRow) {
        return null;
    }

    let usuarios = new Usuarios(selectedUsuariosRow.numeroUsuario);

    return await usuariosApi.findByPK(usuarios);
}

function selectUsuariosRow(selectedRow: UsuariosResultRow) {
    return async (dispatch: MainUsuariosDispatcher) => {
        dispatch({
            type: 'SELECT_USUARIOS_RESULT_ROW',
            selectedRow: selectedRow,
        });
    };
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: MainUsuariosDispatcher,
        getState: () => MainUsuariosState
    ) => {
        const state = getState();
        const loadedModel = await fetchFullModel(state.usuarios.selectedRow);

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_USUARIOS_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_USUARIOS_MODAL',
            mode: mode,
        });
    };
}

function newSearchUsuarios(parameters: ITableUsuariosParameters) {
    return async (dispatch: MainUsuariosDispatcher) => {
        dispatch({
            type: 'SET_USUARIOS_SEARCH_PARAMETERS',
            searchParameters: parameters,
        });

        await searchUsuarios(dispatch, parameters);
    };
}

async function searchUsuarios(
    dispatch: MainUsuariosDispatcher,
    parameters: ITableUsuariosParameters
) {
    const usuarios = await usuariosApi.find(parameters);
    dispatch({
        type: 'SET_USUARIOS_SEARCH_RESULTS',
        results: usuarios,
    });
}

async function repeatCurrentSearch(
    dispatch: MainUsuariosDispatcher,
    getState: () => MainUsuariosState
) {
    const state = getState();
    return await searchUsuarios(dispatch, state.usuarios.searchParameters);
}

function saveModel(model: Usuarios) {
    return async (
        dispatch: MainUsuariosDispatcher,
        getState: () => MainUsuariosState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_USUARIOS_MODEL',
        });

        try {
            if (state.usuarios.modalMode === OperacionesCatalogo.Alta) {
                await usuariosApi.create(model);
            } else {
                await usuariosApi.update(model);
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
        dispatch: MainUsuariosDispatcher,
        getState: () => MainUsuariosState
    ) => {
        const state = getState();

        if (!state.usuarios.selectedRow) {
            return;
        }

        const model = usuariosApi.getModelFromResultRow(
            state.usuarios.selectedRow
        );
        await usuariosApi.destroy(model);
        await repeatCurrentSearch(dispatch, getState);
    };
}

export default {
    selectUsuariosRow,
    fetchAndDisplayModel,
    newSearchUsuarios,
    saveModel,
    deleteSelectedModel,
};
