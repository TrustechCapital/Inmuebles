import BaseModel, { IModel } from './BaseModel';

class Bien extends BaseModel implements IModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.FGarantias';

    idFideicomiso: number;
    idSubcuenta: number;
    idTipoBien: number;
    textoBien?: string = '';
    comentario?: string = '';
    idClaveRevaluacion?: number | null = null;
    importeDeGarantia?: number | null = null;
    importeDelBien?: number | null = null;
    picnorado?: number | null = null;
    importeUltimaValuacion?: number | null = null;
    idClavePeriodicidadRevaluacion?: number | null = null;
    fechaUltimaValuacion?: string | null = null;
    fechaInicio?: string | null = null;
    fechaFin?: string | null = null;
    estatus?: string | null = null;
    esGarantia?: boolean = false;

    constructor(
        idFideicomiso: number,
        idSubcuenta: number,
        idTipoBien: number
    ) {
        super();
        this.idFideicomiso = idFideicomiso;
        this.idSubcuenta = idSubcuenta;
        this.idTipoBien = idTipoBien;
    }

    getPKValues() {
        return {
            idFideicomiso: this.idFideicomiso,
            idSubcuenta: this.idSubcuenta,
            idTipoBien: this.idTipoBien,
        };
    }
}

export default Bien;
