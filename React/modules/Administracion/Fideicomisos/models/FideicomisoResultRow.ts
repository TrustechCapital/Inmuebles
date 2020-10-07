import ResultRowModel from '../../../../models/ResultRowModel';

class FideicomisoResultRow extends ResultRowModel {
    idFideicomiso: number;
    nombreFideicomiso: string;

    constructor(id: string, idFideicomiso: number, nombre: string) {
        super(id);
        this.idFideicomiso = idFideicomiso;
        this.nombreFideicomiso = nombre;
    }

    public static fromObject(obj: any, index: number): FideicomisoResultRow {
        return {
            uniqueKey: obj.ctoNumContrato,
            idFideicomiso: obj.ctoNumContrato,
            nombreFideicomiso: obj.ctoNomContrato,
        };
    }
}
export default FideicomisoResultRow;
