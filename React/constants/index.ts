export const OPERACIONES_CATALOGO = {
    ALTA: 'ALTA',
    MODIFICACION: 'MODIFICACION',
    CONSULTA: 'CONSULTA',
    BAJA: 'BAJA',
};

export enum OperacionesCatalogo {
    Alta,
    Modificacion,
    Consulta,
    Baja,
}

export enum SavingStatus {
    Initial,
    Saving,
    Success,
    Error,
}
