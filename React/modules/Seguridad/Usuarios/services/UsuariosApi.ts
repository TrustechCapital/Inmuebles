import { ModelsApi } from '../../../../core/api';
import { ITableUsuariosParameters } from '../types';
import UsuariosResultRow from '../models/UsuariosResultRow';
import Usuarios from '../../../../models/Usuarios';
import UsuariosModelMapper from './UsuariosModelMapper';

class UsuariosApi extends ModelsApi<Usuarios> {
    getModelFromResultRow(resultRow: UsuariosResultRow) {
        return new Usuarios(resultRow.numeroUsuario);
    }

    async find(
        parameters: ITableUsuariosParameters
    ): Promise<UsuariosResultRow[]> {
        return await this.getRef(
            'muestraDatosUsuarios',
            {
                NoUsuario: parameters.nombreUsuario,
                NomUsuario: parameters.numeroUsuario,
                PerfilCliente: parameters.perfilCliente,
                Status: parameters.status,
            },
            UsuariosResultRow.fromObject
        );
    }
}

export const usuariosApi = new UsuariosApi(UsuariosModelMapper);
