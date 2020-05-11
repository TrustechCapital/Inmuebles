class BienResultRow {
    id: number;
    idFideicomiso: number;
    idSubcuenta: number;
    idTipoBien: number;
    tipoBien: string;
    claveEstatus: string;
    bienDisponible: string;
    importeBien: number;
    importeBienFormateado: string;
    importeBienGarantizado: number;
    importeBienGarantizadoYFormateado: string;
    importePagosBien: number;
    numeroEscritura: string;

    constructor(
        id: number,
        idFideicomiso: number,
        idSubcuenta: number,
        idTipoBien: number,
        tipoBien: string,
        claveEstatus: string,
        bienDisponible: string,
        importeBien: number,
        importeBienFormateado: string,
        importeBienGarantizado: number,
        importeBienGarantizadoYFormateado: string,
        importePagosBien: number,
        numeroEscritura: string
    ) {
        this.id = id;
        this.idFideicomiso = idFideicomiso;
        this.idSubcuenta = idSubcuenta;
        this.idTipoBien = idTipoBien;
        this.tipoBien = tipoBien;
        this.claveEstatus = claveEstatus;
        this.bienDisponible = bienDisponible;
        this.importeBien = importeBien;
        this.importeBienFormateado = importeBienFormateado;
        this.importeBienGarantizado = importeBienGarantizado;
        this.importeBienGarantizadoYFormateado = importeBienGarantizadoYFormateado;
        this.importePagosBien = importePagosBien;
        this.numeroEscritura = numeroEscritura;
    }

    public static fromObject(obj: any, index: number): BienResultRow {
        return {
            id: index,
            idFideicomiso: obj.fgarIdFideicomiso,
            idSubcuenta: obj.fgarIdSubcuenta,
            idTipoBien: obj.fgarCveGarantia,
            tipoBien: obj.fgarCveGarantia2,
            claveEstatus: obj.fgarCveStatus,
            bienDisponible: obj.disponibleBien,
            importeBien: obj.fgarImpGarantia,
            importeBienFormateado: obj.fgarImpGarantiaFormatted,
            importeBienGarantizado: obj.fgarImpGarantizad,
            importeBienGarantizadoYFormateado: obj.fgarImpGarantizadFormatted,
            importePagosBien: obj.pagosBien,
            numeroEscritura: obj.ctoNumEscritura,
        };
    }
}
export default BienResultRow;
