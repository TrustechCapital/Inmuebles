import ResultRowModel from '../../../../models/ResultRowModel';

class LiberacionResultRow extends ResultRowModel {
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idBien: number | null = null;
    idEdificio = '';
    idDepto = '';
    precio: number | null = null;
    moneda = '';
    status = '';

    public static fromObject(obj: any): LiberacionResultRow {
        const mappedObject = {
            idFideicomiso: obj.funiIdFideicomiso,
            idSubcuenta: obj.funiIdSubcuenta,
            idBien: obj.funiIdBien,
            idEdificio: obj.funiIdEdificio,
            idDepto: obj.funiIdDepto,
            precio: obj.funiPrecio,
            moneda: obj.funiMoneda,
            status: obj.funiStatus,
        };

        const id = [
            mappedObject.idFideicomiso,
            mappedObject.idSubcuenta,
            mappedObject.idBien,
            mappedObject.idEdificio,
            mappedObject.idDepto,
        ].join('-');

        return Object.assign(new LiberacionResultRow(id), mappedObject);
    }
}
export default LiberacionResultRow;
