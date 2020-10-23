import ResultRowModel from "../../../../models/ResultRowModel";

class UsuariosResultRow  extends ResultRowModel {
    idUsuario = '';
    nombre = '';
    estatus = '';
    email = '';
    idPerfil: number | null = null;

    public static fromObject(obj: any): UsuariosResultRow {
        const mappedObject = {
            idUsuario: obj.fusuIdUsuario,
            nombre: obj.fusuNombreUsuario,
            estatus: obj.fusuStatus,
            email: obj.fusuEmail,
            idPerfil: obj.fperIdPerfil,
        };

        return Object.assign(new UsuariosResultRow(mappedObject.idUsuario), mappedObject);
    }
}
export default UsuariosResultRow;
