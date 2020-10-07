import ResultRowModel from '../../../../models/ResultRowModel';

class BienResultRow extends ResultRowModel {
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

    public static fromObject(obj: any): BienResultRow {
        const mappedObject = {
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

        const id = [
            mappedObject.idFideicomiso,
            mappedObject.idSubcuenta,
            mappedObject.idTipoBien,
        ].join('-');

        return Object.assign(new BienResultRow(id), mappedObject);
    }
}
export default BienResultRow;
