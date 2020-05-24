import { BienesState, BienesActions } from '../types';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

function bienesReducer(state: BienesState, action: BienesActions): BienesState {
    switch (action.type) {
        case 'SET_BIENES_SEARCH_PARAMETERS':
            return {
                ...state,
                searchParameters: action.searchParameters,
                selectedRow: null,
            };
        case 'SET_BIENES_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.results,
            };
        case 'SET_BIENES_ROWS_SELECTION':
            const selectedRow = action.selectedRow;
            return {
                ...state,
                selectedRow: action.selectedRow,
                currentModel: new Bien(
                    selectedRow.idFideicomiso,
                    selectedRow.idSubcuenta,
                    selectedRow.idTipoBien
                ),
            };
        case 'SET_BIEN_MODEL':
            return {
                ...state,
                currentModel: action.model,
            };
        case 'OPEN_BIENES_MODAL':
            let currentModel = state.currentModel;
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            if (esAlta) {
                currentModel = new Bien(null, null, null);
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
        case 'CLOSE_BIENES_MODAL':
            return {
                ...state,
                modalOpen: false,
            };
        case 'SAVE_BIEN_MODEL':
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

export { bienesReducer };
