import BaseModel from './BaseModel';

class DetalleBien extends BaseModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.FBienesgar';

    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idTipoBien: number | null = null;
    idDetalleBien: number | null = null;
    idTipoDetalleBien: number | null = null;

    identificacion: string = '';
    descripcion: string = '';
    comentario: string = '';
    importeDelBien: number | null = null;
    idMoneda: number | null = null;
    idRevaluacion: number | null = null;
    idClavePeriodicidadRevaluacion: string = '';
    importeUltimaValuacion: number | null = null;
    fechaUltimaValuacion: Date | null = null;
    fechaVencimiento: Date | null = null;
    numeroEscritura: string = '';
    numeroNotario: string = '';
    claveEstatus: string = '';
    idRegimen: number | null = null;

    constructor(
        idFideicomiso: number | null,
        idSubcuenta: number | null,
        idTipoBien: number | null,
        idDetalleBien: number | null,
        idTipoDetalleBien: number | null
    ) {
        super();
        this.idFideicomiso = idFideicomiso;
        this.idSubcuenta = idSubcuenta;
        this.idTipoBien = idTipoBien;
        this.idDetalleBien = idDetalleBien;
        this.idTipoDetalleBien = idTipoDetalleBien;
    }

    getPKValues() {
        return {
            idFideicomiso: this.idFideicomiso,
            idSubcuenta: this.idSubcuenta,
            idTipoBien: this.idTipoBien,
            idDetalleBien: this.idDetalleBien,
            idTipoDetalleBien: this.idTipoDetalleBien,
        };
    }
}

export default DetalleBien;
