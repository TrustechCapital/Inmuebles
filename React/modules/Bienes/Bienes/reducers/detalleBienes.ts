import { DetalleBienesState, DetalleBienesActions } from '../types';
import { OperacionesCatalogo } from '../../../../constants';
import DetalleBien from '../../../../models/DetalleBien';

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
        case 'OPEN_DETALLE_BIENES_MODAL':
            let currentModel = state.currentModel;
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            if (esAlta) {
                currentModel = new DetalleBien(null, null, null, null, null);
            }

            const shouldOpenModal =
                esAlta ||
                (esConsultaOModificacion && state.selectedRows.length === 1);

            if (shouldOpenModal) {
                return {
                    ...state,
                    modalOpen: true,
                    modalMode: action.mode,
                    currentModel: currentModel,
                };
            }

            return state;
        case 'CLOSE_DETALLE_BIENES_MODAL':
            return {
                ...state,
                modalOpen: false,
            };
        default:
            return state;
    }
}

export { detalleBienesReducer };
