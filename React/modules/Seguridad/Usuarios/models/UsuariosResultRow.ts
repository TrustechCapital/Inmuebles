import ResultRowModel from "../../../../models/ResultRowModel";

class UsuariosResultRow extends ResultRowModel {
    nombrePersonalUsuario: string = '';
    nombreUsuariosUsuario: string = '';
    tipoUsuario: string = '';
    numeroUsuario: number | null = null;
    nombrePuesto: string = '';
    nombrePerfil: string = '';
    claveStatusUsuario: string = '';

    public static fromObject(obj: any): UsuariosResultRow {
        return {
            uniqueKey: obj.usuNumUsuario,
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
