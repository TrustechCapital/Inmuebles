class Moneda {
    idPais: number;
    nombreMoneda: string;

    constructor(idPais: number, nombreMoneda: string) {
        this.idPais = idPais;
        this.nombreMoneda = nombreMoneda;
    }

    public static fromObject(obj: any, index: number): Moneda {
        return {
            idPais: obj.monNumPais,
            nombreMoneda: obj.monNomMoneda,
        };
    }
}
export default Moneda;
