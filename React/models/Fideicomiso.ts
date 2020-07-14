class Fideicomiso {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.Contrato';

    id: number | null;
    nombre: string | null;
    claveEstatus: string = 'ACTIVO';

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
