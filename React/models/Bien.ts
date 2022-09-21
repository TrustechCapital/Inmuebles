import BaseModel from './BaseModel';

class Bien extends BaseModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.FGarantias';

    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idTipoBien: number | null = null;
    descripcion: string = '';
    comentario: string = '';
    idClaveRevaluacion: number | null = null;
    importeDeGarantia: number | null = 0;
    importeDelBien: number | null = 0;
    picnorado: number | null = null;
    importeUltimaValuacion: number | null = 0;
    idClavePeriodicidadRevaluacion: number | null = null;
    fechaUltimaValuacion: Date | null = null;
    fechaInicio: Date | null = null;
    fechaFin: Date | null = null;
    estatus: string | null = null;
    esGarantia: boolean = false;
    nombreFideicomiso: string = '';
    constructor(
        idFideicomiso: number | null,
        idSubcuenta: number | null,
        idTipoBien: number | null
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
