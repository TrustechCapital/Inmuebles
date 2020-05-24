import {
    MainBienesState,
    MainBienesActions,
    BienesActions,
    DetalleBienesActions,
} from '../types';

import { bienesReducer } from './bienes';
import { detalleBienesReducer } from './detalleBienes';
import { OperacionesCatalogoDetalleBienes } from '../constants';
import DetalleBien from '../../../../models/DetalleBien';

function mainBienesReducer(
    state: MainBienesState,
    action: MainBienesActions
): MainBienesState {
    switch (action.type) {
        case 'SET_BIENES_SEARCH_RESULTS':
            return {
                bienes: bienesReducer(state.bienes, action),
                detalleBienes: {
                    ...state.detalleBienes,
                    showActionsToolbar: false,
                },
            };
        case 'SELECT_BIENES_RESULT_ROW':
            return {
                bienes: bienesReducer(state.bienes, {
                    ...action,
                    type: 'SET_BIENES_ROWS_SELECTION',
                }),
                detalleBienes: {
                    ...state.detalleBienes,
                    searchResults: action.detalleBienesSearchResults,
                    showActionsToolbar: true,
                },
            };

        case 'OPEN_DETALLE_BIENES_MODAL':
            const currentBienModel = state.bienes.currentModel;
            let currentModel = state.detalleBienes.currentModel;
            const esAlta =
                action.mode === OperacionesCatalogoDetalleBienes.Registro;

            if (esAlta) {
                currentModel = new DetalleBien(
                    currentBienModel.idFideicomiso,
                    currentBienModel.idSubcuenta,
                    currentBienModel.idTipoBien,
                    null,
                    null
                );
            }

            const shouldOpenModal =
                esAlta || state.detalleBienes.selectedRows.length === 1;

            if (shouldOpenModal) {
                return {
                    ...state,
                    detalleBienes: {
                        ...state.detalleBienes,
                        modalOpen: true,
                        modalMode: action.mode,
                        currentModel: currentModel,
                    },
                };
            }

            return state;
        default:
            return {
                bienes: bienesReducer(state.bienes, action as BienesActions),
                detalleBienes: detalleBienesReducer(
                    state.detalleBienes,
                    action as DetalleBienesActions
                ),
            };
    }
}

export { mainBienesReducer };
