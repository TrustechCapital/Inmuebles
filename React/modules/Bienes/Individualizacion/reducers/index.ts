import {
    MainIndividualizacionesState,
    MainIndividualizacionesActions,
    IndividualizacionesActions,
} from '../types';

import { IndividualizacionesReducer } from './individualizaciones';

function mainIndividualizacionesReducer(
    state: MainIndividualizacionesState,
    action: MainIndividualizacionesActions
): MainIndividualizacionesState {
    switch (action.type) {
        case 'SET_INDIVIDUALIZACIONES_SEARCH_RESULTS':
            return {
                Individualizaciones: IndividualizacionesReducer(
                    state.Individualizaciones,
                    action
                ),
            };
        case 'SELECT_INDIVIDUALIZACIONES_RESULT_ROW':
            return {
                Individualizaciones: IndividualizacionesReducer(
                    state.Individualizaciones,
                    {
                        ...action,
                        type: 'SET_INDIVIDUALIZACIONES_ROWS_SELECTION',
                    }
                ),
            };
        default:
            return {
                Individualizaciones: IndividualizacionesReducer(
                    state.Individualizaciones,
                    action as IndividualizacionesActions
                ),
            };
    }
}

export { mainIndividualizacionesReducer };
