class IndividualizacionesResultRow {
    id: number;
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idBien: number | null = null;
    cveGarantia = '';
    idGarantia = '';
    idEdificio = '';
    idDepto = '';
    calleYNumero = '';
    precio: number | null = null;
    moneda = '';
    status = '';

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(
        obj: any,
        index: number
    ): IndividualizacionesResultRow {
        return {
            id: index,
            idFideicomiso: obj.funiIdFideicomiso,
            idSubcuenta: obj.funiIdSubcuenta,
            idBien: obj.funiIdBien,
            cveGarantia: obj.forsCveTipoGarantia,
            idGarantia: obj.funiIdGarantia,
            idEdificio: obj.funiIdEdificio,
            idDepto: obj.funiIdDepto,
            calleYNumero: obj.funiCalleNum,
            precio: obj.funiPrecio,
            moneda: obj.funiMoneda,
            status: obj.funiStatus,
        };
    }
}
export default IndividualizacionesResultRow;
