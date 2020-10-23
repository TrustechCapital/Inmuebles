import Usuario from '../../../../models/Usuarios';
import { CrudActions } from '../../../../sharedComponents/CrudModule';
import UsuariosResultRow from '../models/UsuariosResultRow';
import { usuariosApi } from '../services';
import { ITableUsuariosParameters } from '../types';

export default class UsuariosActions extends CrudActions<
    Usuario,
    ITableUsuariosParameters,
    UsuariosResultRow,
    typeof usuariosApi
> {
    constructor() {
        super(usuariosApi);
    }

    async fetchFullModel(
        selectedRow: UsuariosResultRow | null
    ): Promise<Usuario | null> {
        if (!selectedRow) {
            return null;
        }

        let fideicomiso = new Usuario(selectedRow.idUsuario);

        return await usuariosApi.findByPK(fideicomiso);
    }
}
