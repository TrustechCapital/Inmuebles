class GarantiaResultRow {
    id?: number;
    idFideicomiso: number;
    idSubcuenta: number;
    claveGarantia: number;
    claveEstatus: string;
    bienDisponible: string;
    importeGarantia: number;
    importeGarantiaFormateado: string;
    importeGarantiaGarantizado: number;
    importeGarantiaGarantizadoYFormateado: string;
    importePagosBien: number;
    numeroEscritura: string;

    constructor(
        idFideicomiso: number,
        idSubcuenta: number,
        claveGarantia: number,
        claveEstatus: string,
        bienDisponible: string,
        importeGarantia: number,
        importeGarantiaFormateado: string,
        importeGarantiaGarantizado: number,
        importeGarantiaGarantizadoYFormateado: string,
        importePagosBien: number,
        numeroEscritura: string
    ) {
        this.idFideicomiso = idFideicomiso;
        this.idSubcuenta = idSubcuenta;
        this.claveGarantia = claveGarantia;
        this.claveEstatus = claveEstatus;
        this.bienDisponible = bienDisponible;
        this.importeGarantia = importeGarantia;
        this.importeGarantiaFormateado = importeGarantiaFormateado;
        this.importeGarantiaGarantizado = importeGarantiaGarantizado;
        this.importeGarantiaGarantizadoYFormateado = importeGarantiaGarantizadoYFormateado;
        this.importePagosBien = importePagosBien;
        this.numeroEscritura = numeroEscritura;
    }

    public static fromObject(obj: any, index: number): GarantiaResultRow {
        return {
            id: index,
            idFideicomiso: obj.fgarIdFideicomiso,
            idSubcuenta: obj.fgarIdSubcuenta,
            claveGarantia: obj.fgarCveGarantia,
            claveEstatus: obj.fgarCveStatus,
            bienDisponible: obj.disponibleBien,
            importeGarantia: obj.fgarImpGarantia,
            importeGarantiaFormateado: obj.fgarImpGarantiaFormatted,
            importeGarantiaGarantizado: obj.fgarImpGarantizad,
            importeGarantiaGarantizadoYFormateado:
                obj.fgarImpGarantizadFormatted,
            importePagosBien: obj.pagosBien,
            numeroEscritura: obj.ctoNumEscritura,
        };
    }
}
export default GarantiaResultRow;
