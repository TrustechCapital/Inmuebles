class UsuariosResultRow {
    id: number;
    nombrePersonalUsuario: string = '';
    nombreUsuariosUsuario: string = '';
    tipoUsuario: string = '';
    numeroUsuario: number | null = null;
    nombrePuesto: string = '';
    nombrePerfil: string = '';
    claveStatusUsuario: string = '';

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): UsuariosResultRow {
        return {
            id: index,
            nombrePersonalUsuario: obj.perNomUsuario,
            nombreUsuariosUsuario: obj.usuNomUsuario,
            tipoUsuario: obj.usuTipoUsuario,
            numeroUsuario: obj.usuNumUsuario,
            nombrePuesto: obj.usuNomPuesto,
            nombrePerfil: obj.fperNombrePerfil,
            claveStatusUsuario: obj.usuCveStUsuario,
        };
    }
}
export default UsuariosResultRow;
