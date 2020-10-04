class LiberacionResultRow {
    id: number;
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idBien: number | null = null;
    idEdificio = '';
    idDepto = '';
    precio: number | null = null;
    moneda = '';
    status = '';

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): LiberacionResultRow {
        return {
            id: index,
            idFideicomiso: obj.funiIdFideicomiso,
            idSubcuenta: obj.funiIdSubcuenta,
            idBien: obj.funiIdBien,
            idEdificio: obj.funiIdEdificio,
            idDepto: obj.funiIdDepto,
            precio: obj.funiPrecio,
            moneda: obj.funiMoneda,
            status: obj.funiStatus,
        };
    }
}
export default LiberacionResultRow;
