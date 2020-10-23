import { IModelMapper } from '../../../../core/api';
import Usuarios from '../../../../models/Usuarios';

class UsuariosModelMapper implements IModelMapper<Usuarios> {
    fromObject(data: any) {
        const usuarios = new Usuarios(data.usuNumUsuario);

        Object.assign(usuarios, {
            idUsuario: data.fusuIdUsuario,
            nombre: data.fusuNombreUsuario,
            estatus: data.fusuStatus,
            idPerfil: data.fperIdPerfil,
            email: data.fusuEmail
        });
        return usuarios;
    }

    toObject(usuarios: Usuarios, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                fusuIdUsuario: usuarios.idUsuario,
            };
        }

        return {
            fusuIdUsuario: usuarios.idUsuario,
            fusuNombreUsuario: usuarios.nombre,
            fusuStatus: usuarios.estatus,
            fperIdPerfil: usuarios.idPerfil,
            fusuEmail: usuarios.email
        };
    }
}

export default new UsuariosModelMapper();
