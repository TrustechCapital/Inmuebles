import { DetalleBienesState, DetalleBienesActions } from '../types';
import { SavingStatus } from '../../../../constants';
import { OperacionesCatalogoDetalleBienes } from '../constants';

export type BienesDispatcher = React.Dispatch<DetalleBienesActions>;

function detalleBienesReducer(
    state: DetalleBienesState,
    action: DetalleBienesActions
): DetalleBienesState {
    switch (action.type) {
        case 'SET_DETALLE_BIENES_ROWS_SELECTION':
            return {
                ...state,
                selectedRows: action.selectedRows,
            };
        case 'SET_DETALLE_BIEN_MODEL':
            return {
                ...state,
                currentModel: action.model,
            };
        case 'OPEN_NEW_DETALLE_BIENES_MODAL':
            return {
                ...state,
                modalOpen: true,
                modalMode: OperacionesCatalogoDetalleBienes.Registro,
                currentModel: action.newModel,
            };
        case 'OPEN_DETALLE_BIENES_MODAL':
            if (state.selectedRows.length === 1) {
                return {
                    ...state,
                    modalOpen: true,
                    modalMode: action.mode,
                };
            }

            return state;
        case 'CLOSE_DETALLE_BIENES_MODAL':
            return {
                ...state,
                modalOpen: false,
            };
        case 'SAVE_DETALLE_BIEN_MODEL':
            return {
                ...state,
                savingStatus: SavingStatus.Saving,
                modalErrorMessage: null,
            };
        case 'SET_DETALLE_BIEN_MODEL_SAVE_SUCCESS':
            let modalMode = state.modalMode;

            // Cambiar modo de edicion del modal
            if (modalMode === OperacionesCatalogoDetalleBienes.Registro) {
                modalMode = OperacionesCatalogoDetalleBienes.Modificacion;
            }

            return {
                ...state,
                savingStatus: SavingStatus.Success,
                modalMode: modalMode,
            };
        case 'SET_DETALLE_BIEN_MODEL_SAVE_ERROR':
            return {
                ...state,
                savingStatus: SavingStatus.Error,
                modalErrorMessage: action.error,
            };
        default:
            return state;
    }
}

export { detalleBienesReducer };
