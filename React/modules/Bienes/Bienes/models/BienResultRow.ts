class BienResultRow {
    id: number;
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idTipoBien: number | null = null;
    tipoBien: string = '';
    claveEstatus: string = '';
    bienDisponible: string = '';
    importeBien: number | null = null;
    importeBienGarantizado: number | null = null;
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
            tipoBien: obj.descripcionTipoBien,
            claveEstatus: obj.fgarCveStatus,
            bienDisponible: obj.importeBienDisponible,
            importeBien: obj.fgarImpGarantia,
            importeBienGarantizado: obj.fgarImpGarantizad,
            importePagosBien: obj.pagosBien,
            numeroEscritura: obj.ctoNumEscritura,
        };
    }
}
export default BienResultRow;
