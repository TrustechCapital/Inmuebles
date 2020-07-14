import { MainPolizaState, MainPolizaActions, PolizaActions } from '../types';

import { PolizasReducer } from './polizas';

function mainPolizaReducer(
    state: MainPolizaState,
    action: MainPolizaActions
): MainPolizaState {
    switch (action.type) {
        case 'SET_POLIZA_SEARCH_RESULTS':
            return {
                Movimientos: PolizasReducer(
                    state.Movimientos,
                    action
                ),
            };
        case 'SELECT_POLIZA_RESULT_ROW':
            return {
                Movimientos: PolizasReducer(state.Movimientos, {
                    ...action,
                    type: 'SET_POLIZA_ROWS_SELECTION',
                }),
            };
        default:
            return {
                Movimientos: PolizasReducer(
                    state.Movimientos,
                    action as PolizaActions
                ),
            };
    }
}

export { mainPolizaReducer };
