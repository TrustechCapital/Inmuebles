import ResultRowModel from '../../../../models/ResultRowModel';

class IndividualizacionesResultRow extends ResultRowModel {
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idBien: number | null = null;
    cveGarantia = '';
    idGarantia = '';
    idEdificio = '';
    idDepto = '';
    calleYNumero = '';
    precio ='';
    moneda = '';
    status = '';

    public static fromObject(
        obj: any,
        index: number
    ): IndividualizacionesResultRow {
        const mappedObject = {
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

        const id = [
            mappedObject.idFideicomiso,
            mappedObject.idSubcuenta,
            mappedObject.idBien,
            mappedObject.idEdificio,
            mappedObject.idDepto,
        ].join('-');

        return Object.assign(
            new IndividualizacionesResultRow(id),
            mappedObject
        );
    }
}
export default IndividualizacionesResultRow;
