import ResultRowModel from '../../../../models/ResultRowModel';

class PolizaResultRow extends ResultRowModel {
    fecha = '';
    idFideicomiso: number | null = null;
    nombreFideicomiso = '';
    descripcionMovimiento = '';
    numeroTransaccion: number | null = null;

    public static fromObject(obj: any, index: number): PolizaResultRow {
        const mappedObject = {
            fecha: obj.movFecha,
            idFideicomiso: obj.movNumContrato,
            nombreFideicomiso: obj.ctoNomContrato,
            descripcionMovimiento: obj.movDescMovto,
            numeroTransaccion: obj.movNumTransac,
        };

        const id = [
            mappedObject.fecha,
            mappedObject.idFideicomiso,
            mappedObject.numeroTransaccion,
        ].join('-');

        return Object.assign(new PolizaResultRow(id), mappedObject);
    }
}
export default PolizaResultRow;
