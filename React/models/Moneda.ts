class Moneda {
    numPais: number;
    nomMoneda: string;

    constructor(numPais: number, nomMoneda: string) {
        this.numPais = numPais;
        this.nomMoneda = nomMoneda;
    }

    public static fromObject(obj: any, index: number): Moneda {
        return {
            numPais: obj.monNumPais,
            nomMoneda: obj.monNomMoneda,
        };
    }
}
export default Moneda;
