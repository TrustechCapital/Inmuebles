import { MainUsuariosState, ITableUsuariosParameters, MainUsuariosActions } from '../types';
import Usuario from '../../../../models/Usuarios';
import UsuariosResultRow from '../models/UsuariosResultRow';
import { CrudModuleReducer } from '../../../../sharedComponents/CrudModule';

const reducerHelper = {
    mainModelFromRow: (selectedRow: UsuariosResultRow) =>
        new Usuario(
            selectedRow.idUsuario
        ),
    newModel: () => new Usuario(null),
};

function mainUsuariosReducer(
    state: MainUsuariosState,
    action: MainUsuariosActions
): MainUsuariosState {
    switch (action.type) {
        default:
            return CrudModuleReducer<
                Usuario,
                ITableUsuariosParameters,
                UsuariosResultRow
            >(state, action, reducerHelper);
    }
}

export { mainUsuariosReducer };
