import BaseModel from './BaseModel';

class Usuarios extends BaseModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.FUsuario';

    idUsuario: string | null;
    nombre = '';
    estatus = '';
    email = '';
    idPerfil: number | null = null;

    constructor(idUsuario: string | null) {
        super();
        this.idUsuario = idUsuario;
    }
}

export default Usuarios;
