class PolizaResultRow {
    id: number;
    fecha = '';
    numTransaccion: number | null = null;
    cuentaMayor: number | null = null;
    subcuental1: number | null = null;
    subcuental2: number | null = null;
    subcuental3: number | null = null;
    subcuental4: number | null = null;
    subcuental5: number | null = null;
    importe: number | null = null;
    claveCarAbo = '';

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): PolizaResultRow {
        return {
            id: index,
            fecha: obj.movFecha,
            numTransaccion: obj.guiNumGuia,
            cuentaMayor: obj.guiNumCtam,
            subcuental1: obj.guiNumScta,
            subcuental2: obj.guiNumSScta,
            subcuental3: obj.guiNumSSScta,
            subcuental4: obj.guiNumSSSScta,
            subcuental5: obj.guiNumSSSSScta,
            importe: obj.movImpMovto,
            claveCarAbo: obj.claveCa,
        };
    }
}
export default PolizaResultRow;
