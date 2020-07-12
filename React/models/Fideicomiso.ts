class Fideicomiso {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.FContrato';

    id: number | null;
    nombre: string | null;

    constructor(id: number | null, nombre: string | null) {
        this.id = id;
        this.nombre = nombre;
    }

    getPKValues() {
        return {
            id: this.id,
        };
    }
}
export default Fideicomiso;
