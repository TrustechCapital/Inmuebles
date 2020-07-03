class Estados {
    idPais: number;
    idEstado: number;
    nombreEstado: string;

    constructor(idPais: number, idEstado: number, nombreEstado: string) {
        this.idPais = idPais;
        this.idEstado = idEstado;
        this.nombreEstado = nombreEstado;
    }

    public static fromObject(obj: any, index: number): Estados {
        return {
            idPais: obj.edoNumPais,
            idEstado: obj.edoNumEstado,
            nombreEstado: obj.edoNomEstado,
        };
    }
}
export default Estados;
