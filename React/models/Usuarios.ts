import BaseModel from './BaseModel';

class Usuarios extends BaseModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.Usuarios';

    numeroUsuario: number | null = null;
    nombreUsuario: string | null = null;
    tipoUsuario: string | null = null;
    numeroPuesto: number | null = null;
    nombrePuesto: string | null = null;
    password: string = 'prueba';
    anioAltaReg: number | null = 2020;
    mesAltaReg: number | null = 6;
    diaAltaReg: number | null = 5;
    anioUltimaModificacion: number | null = 2020;
    mesUltimaModificacion: number | null = 6;
    diaUltimaModificacion: number | null = 10;
    claveStatus: string | null = null;
    nivel1: number | null = 1;
    nivel2: number | null = 0;
    nivel3: number | null = 0;
    nivel4: number | null = 0;
    nivel5: number | null = 0;
    centroLogro: number | null = 0;
    centroCosto: number | null = 0;
    ptceGpot: number | null = 0;
    fechaUltimoAcceso: Date | null = null;
    fechaPassword: Date | null = null;
    statusSeguridad: number | null = null;
    token: number | null = null;
    montoAutorizado: number | null = 0;
    perfilInterno: string = 'perfil';

    constructor(numeroUsuario: number | null) {
        super();
        this.numeroUsuario = numeroUsuario;
    }

    getPKValues() {
        return {
            numeroUsuario: this.numeroUsuario,
        };
    }
}

export default Usuarios;
