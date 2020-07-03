import { UsuariosState, UsuariosActions } from '../types';
import Usuarios from '../../../../models/Usuarios';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

function usuariosReducer(
    state: UsuariosState,
    action: UsuariosActions
): UsuariosState {
    switch (action.type) {
        case 'SET_USUARIOS_SEARCH_PARAMETERS':
            return {
                ...state,
                searchParameters: action.searchParameters,
                selectedRow: null,
            };
        case 'SET_USUARIOS_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.results,
            };
        case 'SET_USUARIOS_ROWS_SELECTION':
            const selectedRow = action.selectedRow;
            return {
                ...state,
                selectedRow: action.selectedRow,
                currentModel: new Usuarios(selectedRow.numeroUsuario),
            };
        case 'SET_USUARIOS_MODEL':
            return {
                ...state,
                currentModel: action.model,
            };
        case 'OPEN_USUARIOS_MODAL':
            let currentModel = state.currentModel;
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            if (esAlta) {
                currentModel = new Usuarios(null);
            }

            const shouldOpenModal =
                esAlta || (esConsultaOModificacion && state.selectedRow);

            if (shouldOpenModal) {
                return {
                    ...state,
                    modalOpen: true,
                    modalMode: action.mode,
                    savingStatus: SavingStatus.Initial,
                    currentModel: currentModel,
                };
            }

            return state;
        case 'CLOSE_USUARIOS_MODAL':
            return {
                ...state,
                modalOpen: false,
            };
        case 'SAVE_USUARIOS_MODEL':
            return {
                ...state,
                savingStatus: SavingStatus.Saving,
                modalErrorMessage: null,
            };
        case 'SET_MODEL_SAVE_SUCCESS':
            let modalMode = state.modalMode;

            // Cambiar modo de edicion del modal
            if (modalMode === OperacionesCatalogo.Alta) {
                modalMode = OperacionesCatalogo.Modificacion;
            }

            return {
                ...state,
                savingStatus: SavingStatus.Success,
                modalMode: modalMode,
            };
        case 'SET_MODEL_SAVE_ERROR':
            return {
                ...state,
                savingStatus: SavingStatus.Error,
                modalErrorMessage: action.error,
            };
        default:
            return state;
    }
}

export { usuariosReducer };
