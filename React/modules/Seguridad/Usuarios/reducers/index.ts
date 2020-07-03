import {
    MainUsuariosState,
    MainUsuariosActions,
    UsuariosActions,
} from '../types';

import { usuariosReducer } from './usuarios';

function mainUsuariosReducer(
    state: MainUsuariosState,
    action: MainUsuariosActions
): MainUsuariosState {
    switch (action.type) {
        case 'SET_USUARIOS_SEARCH_RESULTS':
            return {
                usuarios: usuariosReducer(state.usuarios, action),
            };
        case 'SELECT_USUARIOS_RESULT_ROW':
            return {
                usuarios: usuariosReducer(state.usuarios, {
                    ...action,
                    type: 'SET_USUARIOS_ROWS_SELECTION',
                }),
            };
        default:
            return {
                usuarios: usuariosReducer(
                    state.usuarios,
                    action as UsuariosActions
                ),
            };
    }
}

export { mainUsuariosReducer };
