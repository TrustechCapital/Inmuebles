class FideicomisoResultRow {
    id: number;
    idFideicomiso: number;
    nombreFideicomiso: string;

    constructor(id: number, idFideicomiso: number, nombre: string) {
        this.id = id;
        this.idFideicomiso = idFideicomiso;
        this.nombreFideicomiso = nombre;
    }

    public static fromObject(obj: any, index: number): FideicomisoResultRow {
        return {
            id: obj.ctoNumContrato,
            idFideicomiso: obj.ctoNumContrato,
            nombreFideicomiso: obj.ctoNomContrato,
        };
    }
}
export default FideicomisoResultRow;
