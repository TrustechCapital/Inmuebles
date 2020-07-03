export const adminUser = {
    user: {
        username: 'admin',
        name: 'Administrador',
    },
    systemDate: '01/06/2020',
    permissions: [
        {
            name: 'BIENES.BIENES',
            canView: true,
            canEdit: true,
        },
        {
            name: 'BIENES.CARGA_MASIVA',
            canView: true,
            canEdit: true,
        },
        {
            name: 'BIENES.INDIVIDUALIZACION',
            canView: true,
            canEdit: true,
        },
        {
            name: 'BIENES.ADQUIRIENTES',
            canView: true,
            canEdit: true,
        },
        {
            name: 'BIENES.LIBERACIONES',
            canView: true,
            canEdit: true,
        },
        {
            name: 'INTERFASES.INTERFASES',
            canView: true,
            canEdit: true,
        },
        {
            name: 'OPERACIONES.APERTURA_CIERRE',
            canView: true,
            canEdit: true,
        },
        {
            name: 'REPORTES.REPORTE_BIENES',
            canView: true,
            canEdit: true,
        },
        {
            name: 'SEGURIDAD.USUARIOS',
            canView: true,
            canEdit: true,
        },
    ],
};

export const reportsUser = {
    user: {
        username: 'audit',
        name: 'Auditor',
    },
    systemDate: '01/06/2020',
    permissions: [
        {
            name: 'REPORTES.REPORTE_BIENES',
            canView: true,
            canEdit: true,
        },
    ],
};

export const user1 = {
    user: {
        username: 'user1',
        name: 'Usuario 1',
    },
    systemDate: '01/06/2020',
    permissions: [
        {
            name: 'BIENES.CARGA_MASIVA',
            canView: true,
            canEdit: true,
        },
        {
            name: 'BIENES.INDIVIDUALIZACION',
            canView: true,
            canEdit: true,
        },
    ],
};
