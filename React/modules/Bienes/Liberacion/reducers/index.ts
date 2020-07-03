import {
    MainLiberacionesState,
    MainLiberacionesActions,
    LiberacionesActions,
} from '../types';

import { LiberacionesReducer } from './liberaciones';

function mainLiberacionesReducer(
    state: MainLiberacionesState,
    action: MainLiberacionesActions
): MainLiberacionesState {
    switch (action.type) {
        case 'SET_LIBERACIONES_SEARCH_RESULTS':
            return {
                Liberaciones: LiberacionesReducer(state.Liberaciones, action),
            };
        case 'SELECT_LIBERACIONES_RESULT_ROW':
            return {
                Liberaciones: LiberacionesReducer(state.Liberaciones, {
                    ...action,
                    type: 'SET_LIBERACIONES_ROWS_SELECTION',
                }),
            };
        default:
            return {
                Liberaciones: LiberacionesReducer(
                    state.Liberaciones,
                    action as LiberacionesActions
                ),
            };
    }
}

export { mainLiberacionesReducer };
