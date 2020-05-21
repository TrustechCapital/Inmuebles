class DetalleBienResultRow {
    id: number;
    idFideicomiso: number | null = null;
    tipoBien: string = '';
    importeUltimaValuacionFormateado: string = '';
    descripcion: string = '';

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): DetalleBienResultRow {
        return {
            id: index,
            idFideicomiso: obj.fgrsIdFideicomiso,
            tipoBien: obj.descripbien,
            importeUltimaValuacionFormateado: obj.forsImpUltValuaFormatted,
            descripcion: obj.forsTextoDescrip,
        };
    }
}
export default DetalleBienResultRow;
