import { IModelMapper } from '../../../core/api';
import Usuarios from '../../../models/Usuarios';
import DateUtils from '../../../utils/DateUtils';

class UsuariosModelMapper implements IModelMapper<Usuarios> {
    fromObject(data: any) {
        const [fechaUltimoAcceso, fechaPassword] = DateUtils.toDates([
            data.usuFechaUltAcceso,
            data.usuFechaPassword,
        ]);

        const usuarios = new Usuarios(data.usuNumUsuario);
        Object.assign(usuarios, {
            nombreUsuario: data.usuNomUsuario,
            claveStatus: data.usuCveStUsuario,
            numeroPuesto: data.usuNumPuesto,
            tipoUsuario: data.usuTipoUsuario,
            nombrePuesto: data.usuNomPuesto,
            password: data.usuPassword,
            anioAltaReg: data.usuAnoAltaReg,
            mesAltaReg: data.usuMesAltaReg,
            diaAltaReg: data.usuDiaAltaReg,
            anioUltimaModificacion: data.usuAnoUltMod,
            mesUltimaModificacion: data.usuMesUltMod,
            diaUltimaModificacion: data.usuDiaUltMod,
            nivel1: data.usuNumNivel1,
            nivel2: data.usuNumNivel2,
            nivel3: data.usuNumNivel3,
            nivel4: data.usuNumNivel4,
            nivel5: data.usuNumNivel5,
            centroLogro: data.usuCentroLogro,
            centroCosto: data.usuCentroCosto,
            ptceGpot: data.usuPtceGpot,
            fechaUltimoAcceso: fechaUltimoAcceso,
            fechaPassword: fechaPassword,
            statusSeguridad: data.usuEstatusSeguridad,
            token: data.usuToken,
            montoAutorizado: data.usuMontoAutorizado,
            perfilInterno: data.usuPerfilInterno,
        });
        return usuarios;
    }

    toObject(usuarios: Usuarios, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                usuNumUsuario: usuarios.numeroUsuario,
            };
        }

        const [fechaUltimoAcceso, fechaPassword] = DateUtils.fromDates([
            usuarios.fechaUltimoAcceso,
            usuarios.fechaPassword,
        ]);

        return {
            usuNumUsuario: usuarios.numeroUsuario,
            usuNomUsuario: usuarios.nombreUsuario,
            usuTipoUsuario: usuarios.tipoUsuario,
            usuNumPuesto: usuarios.numeroPuesto,
            usuNomPuesto: usuarios.nombrePuesto,
            usuPassword: usuarios.password,
            usuAnoAltaReg: usuarios.anioAltaReg,
            usuMesAltaReg: usuarios.mesAltaReg,
            usuDiaAltaReg: usuarios.diaAltaReg,
            usuAnoUltMod: usuarios.anioUltimaModificacion,
            usuMesUltMod: usuarios.mesUltimaModificacion,
            usuDiaUltMod: usuarios.diaUltimaModificacion,
            usuCveStUsuario: usuarios.claveStatus,
            usuNumNivel1: usuarios.nivel1,
            usuNumNivel2: usuarios.nivel2,
            usuNumNivel3: usuarios.nivel3,
            usuNumNivel4: usuarios.nivel4,
            usuNumNivel5: usuarios.nivel5,
            usuCentroLogro: usuarios.centroLogro,
            usuCentroCosto: usuarios.centroCosto,
            usuFechaUltAcceso: fechaUltimoAcceso,
            usuFechaPassword: fechaPassword,
            usuEstatusSeguridad: usuarios.statusSeguridad,
            usuToken: usuarios.token,
            usuMontoAutorizado: usuarios.montoAutorizado,
            usuPerfilInterno: usuarios.perfilInterno,
        };
    }
}

export default new UsuariosModelMapper();
