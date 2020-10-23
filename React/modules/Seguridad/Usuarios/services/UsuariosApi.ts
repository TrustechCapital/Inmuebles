import { ModelsApi } from '../../../../core/api';
import { ITableUsuariosParameters } from '../types';
import UsuarioResultRow from '../models/UsuariosResultRow';
import Usuario from '../../../../models/Usuarios';
import UsuarioModelMapper from './UsuariosModelMapper';
import { ICrudModuleApi } from '../../../../sharedComponents/CrudModule/types';

class UsuariosApi extends ModelsApi<Usuario>
    implements
        ICrudModuleApi<Usuario, ITableUsuariosParameters, UsuarioResultRow> {
    getModelFromResultRow(resultRow: UsuarioResultRow) {
        return new Usuario(resultRow.idUsuario);
    }

    async exists(model: Usuario): Promise<boolean> {
        return await this.getRef(
            'verificaExistenciaUsuario',
            {
                idUsuario: model.idUsuario
            },
            (data) => {
                return data;
            }
            
        ).then((data: any) => {
            return data[0].numRegistros === 1;
        });
    }

    async find(
        parameters: ITableUsuariosParameters
    ): Promise<UsuarioResultRow[]> {
        return await this.getRef(
            'qryConsultaUsuarios',
            {
                idUsuario: parameters.idUsuario,
                nombreUsuario: parameters.nombreUsuario,
                idPerfil: parameters.idPerfil,
                status: parameters.status,
            },
            UsuarioResultRow.fromObject
        );
    }
}

export const usuariosApi = new UsuariosApi(UsuarioModelMapper);
