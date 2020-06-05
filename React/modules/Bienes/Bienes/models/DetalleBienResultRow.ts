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
            idSubcuenta: obj.fgrsIdSubcuenta,
            idTipoBien: obj.forsCveTipoGarantia,
            tipoBien: obj.descripbien,
            idDetalleBien: obj.forsIdGarantia,
            idTipoDetalleBien: obj.forsCveTipoBien,

            importeUltimaValuacionFormateado: obj.forsImpUltValuaFormatted,
            descripcion: obj.forsTextoDescrip,
        };
    }
}
export default DetalleBienResultRow;
