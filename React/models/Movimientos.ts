import BaseModel from './BaseModel';

class Movimientos extends BaseModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.Movimien';

    movAnoMovto: number | null = null;
    movMesMovto: number | null = null;
    movDiaMovto: number | null = null;
    movNumContrato: number | null = null;
    movSubContrato: number | null = null;
    movFolioOpera: number | null = null;
    movNumModulo: number | null = null;
    movNumTransac: number | null = null;
    movNumUsuario: number | null = null;
    movDescMovto: string | null = null;
    movHrTransac: number | null = null;
    movMinTransac: number | null = null;
    movImpMovto: number | null = null;
    movCveTipoMerca: number | null = null;
    movNumInstrume: number | null = null;
    movNumSecEmis: number | null = null;
    movNumTitulos: number | null = null;
    movCveImpreEdo: number | null = null;
    movCveEntSal: string | null = null;
    movAnoAltaReg: number | null = null;
    movMesAltaReg: number | null = null;
    movDiaAltaReg: number | null = null;
    movAnoUltMod: number | null = null;
    movMesUltMod: number | null = null;
    movDiaUltMod: number | null = null;
    movCveStMovto: string | null = null;
    movCveAcumEdcta: string | null = null;

    constructor(
        movAnoMovto: number | null,
        movMesMovto: number | null,
        movDiaMovto: number | null,
        movNumContrato: number | null,
        movSubContrato: number | null,
        movFolioOpera: number | null,
        movNumModulo: number | null,
        movNumTransac: number | null
    ) {
        super();
        this.movAnoMovto = movAnoMovto;
        this.movMesMovto = movMesMovto;
        this.movDiaMovto = movDiaMovto;
        this.movNumContrato = movNumContrato;
        this.movSubContrato = movSubContrato;
        this.movFolioOpera = movFolioOpera;
        this.movNumModulo = movNumModulo;
        this.movNumTransac = movNumTransac;
    }

    getPKValues() {
        return {
            movAnoMovto: this.movAnoMovto,
            movMesMovto: this.movMesMovto,
            movDiaMovto: this.movDiaMovto,
            movNumContrato: this.movNumContrato,
            movSubContrato: this.movSubContrato,
            movFolioOpera: this.movFolioOpera,
            movNumModulo: this.movNumModulo,
            movNumTransac: this.movNumTransac,
        };
    }
}

export default Movimientos;
