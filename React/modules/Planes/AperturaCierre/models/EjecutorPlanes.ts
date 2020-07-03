class EjecutorPlanes {
    fecha: number | null;
    plan: string | null;
    usuario: number | null;

    constructor(
        fecha: number | null,
        plan: string | null,
        user: number | null
    ) {
        this.fecha = fecha;
        this.plan = plan;
        this.usuario = user;
    }
}

export default EjecutorPlanes;
