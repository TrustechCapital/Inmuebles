class Paises {
    idPais: number;
    nombrePais: string;

    constructor(idPais: number, nombrePais: string) {
        this.idPais = idPais;
        this.nombrePais = nombrePais;
    }

    public static fromObject(obj: any, index: number): Paises {
        return {
            idPais: obj.paiNumPais,
            nombrePais: obj.paiNomPais,
        };
    }
}
export default Paises;
