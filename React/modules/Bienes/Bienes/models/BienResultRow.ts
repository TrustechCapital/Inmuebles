class BienResultRow {
    id: number;
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idTipoBien: number | null = null;
    tipoBien: string = '';
    claveEstatus: string = '';
    bienDisponible: string = '';
    importeBien: number | null = null;
    importeBienFormateado: string = '';
    importeBienGarantizado: number | null = null;
    importeBienGarantizadoYFormateado: string = '';
    importePagosBien: number | null = null;
    numeroEscritura: string = '';

    constructor(id: number) {
        this.id = id;
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
