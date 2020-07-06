import { MainPolizaState, MainPolizaActions, PolizaActions } from '../types';

import { PolizaReducer } from './reportes';

function mainPolizaReducer(
    state: MainPolizaState,
    action: MainPolizaActions
): MainPolizaState {
    switch (action.type) {
        case 'SET_POLIZA_SEARCH_RESULTS':
            return {
                Individualizacion: PolizaReducer(
                    state.Individualizacion,
                    action
                ),
            };
        case 'SELECT_POLIZA_RESULT_ROW':
            return {
                Individualizacion: PolizaReducer(state.Individualizacion, {
                    ...action,
                    type: 'SET_POLIZA_ROWS_SELECTION',
                }),
            };
        default:
            return {
                Individualizacion: PolizaReducer(
                    state.Individualizacion,
                    action as PolizaActions
                ),
            };
    }
}

export { mainPolizaReducer };
