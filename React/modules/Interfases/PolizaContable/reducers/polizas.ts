import { PolizaState, PolizaActions } from '../types';
import Movimientos from '../../../../models/Movimientos';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

function PolizasReducer(
    state: PolizaState,
    action: PolizaActions
): PolizaState {
    switch (action.type) {
        case 'SET_POLIZA_SEARCH_PARAMETERS':
            return {
                ...state,
                searchParameters: action.searchParameters,
                selectedRow: null,
            };
        case 'SET_POLIZA_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.results,
            };
        case 'SET_POLIZA_MODEL':
            return {
                ...state,
                currentModel: action.model,
            };
        case 'OPEN_POLIZA_MODAL':
            let currentModel = state.currentModel;
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            if (esAlta) {
                currentModel = new Movimientos(null, null, null, null, null, null, null, null);
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
        case 'CLOSE_POLIZA_MODAL':
            return {
                ...state,
                modalOpen: false,
            };
        case 'SAVE_POLIZA_MODEL':
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

export { PolizasReducer };
