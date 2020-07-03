import { LiberacionesState, LiberacionesActions } from '../types';
import Liberacion from '../../../../models/Individualizacion';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

function LiberacionesReducer(
    state: LiberacionesState,
    action: LiberacionesActions
): LiberacionesState {
    switch (action.type) {
        case 'SET_LIBERACIONES_SEARCH_PARAMETERS':
            return {
                ...state,
                searchParameters: action.searchParameters,
                selectedRow: null,
            };
        case 'SET_LIBERACIONES_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.results,
            };
        case 'SET_LIBERACIONES_ROWS_SELECTION':
            const selectedRow = action.selectedRow;
            return {
                ...state,
                selectedRow: action.selectedRow,
                currentModel: new Liberacion(
                    selectedRow.idFideicomiso,
                    selectedRow.idSubcuenta,
                    selectedRow.idBien,
                    selectedRow.idEdificio,
                    selectedRow.idDepto
                ),
            };
        case 'SET_LIBERACIONES_MODEL':
            return {
                ...state,
                currentModel: action.model,
            };
        case 'OPEN_LIBERACIONES_MODAL':
            let currentModel = state.currentModel;
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            if (esAlta) {
                currentModel = new Liberacion(null, null, null, null, null);
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
        case 'CLOSE_LIBERACIONES_MODAL':
            return {
                ...state,
                modalOpen: false,
            };
        case 'SAVE_LIBERACIONES_MODEL':
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

export { LiberacionesReducer };
