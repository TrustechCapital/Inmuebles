class DetalleBienResultRow {
    id: number;
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idTipoBien: number | null = null;
    tipoBien: string = '';
    idDetalleBien: number | null = null;
    idTipoDetalleBien: number | null = null;
    importeUltimaValuacionFormateado: string = '';
    descripcion: string = '';

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): DetalleBienResultRow {
        return {
            id: index,
            idFideicomiso: obj.fgrsIdFideicomiso,
            idSubcuenta: obj.fgrs_id_subcuenta,
            idTipoBien: obj.fors_cve_tipo_bien,
            tipoBien: obj.descripbien,
            idDetalleBien: obj.fors_id_garantia,
            idTipoDetalleBien: obj.fors_cve_tipo_garantia,

            importeUltimaValuacionFormateado: obj.forsImpUltValuaFormatted,
            descripcion: obj.forsTextoDescrip,
        };
    }
}
export default DetalleBienResultRow;
