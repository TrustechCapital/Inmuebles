class PolizaResultRow {
    id: number;
    fecha = '';
    idFideicomiso: number | null = null;
    nombreFideicomiso = '';
    descripcionMovimiento = '';
    numeroTransaccion: number | null = null;

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): PolizaResultRow {
        return {
            id: index,
            fecha: obj.movFecha,
            idFideicomiso: obj.movNumContrato,
            nombreFideicomiso: obj.ctoNomContrato,
            descripcionMovimiento: obj.movDescMovto,
            numeroTransaccion: obj.movNumTransac
        };
    }
}
export default PolizaResultRow;
