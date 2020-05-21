import {
    MainBienesState,
    MainBienesActions,
    BienesActions,
    DetalleBienesActions,
} from '../types';

import { bienesReducer } from './bienes';
import { detalleBienesReducer } from './detalleBienes';

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
