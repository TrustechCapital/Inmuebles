import { DetalleBienesState, DetalleBienesActions } from '../types';

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
        case 'OPEN_DETALLE_BIENES_MODAL':
            return {
                ...state,
                modalOpen: true,
            };
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
