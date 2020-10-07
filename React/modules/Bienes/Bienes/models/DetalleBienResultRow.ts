import ResultRowModel from '../../../../models/ResultRowModel';

class DetalleBienResultRow extends ResultRowModel {
    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idTipoBien: number | null = null;
    tipoBien: string = '';
    idDetalleBien: number | null = null;
    idTipoDetalleBien: number | null = null;
    importeUltimaValuacion: number | null = null;
    descripcion: string = '';

    public static fromObject(obj: any, index: number): DetalleBienResultRow {
        const mappedObject = {
            idFideicomiso: obj.fgrsIdFideicomiso,
            idSubcuenta: obj.fgrsIdSubcuenta,
            idTipoBien: obj.forsCveTipoGarantia,
            tipoBien: obj.descripbien,
            idDetalleBien: obj.forsIdGarantia,
            idTipoDetalleBien: obj.forsCveTipoBien,
            importeUltimaValuacion: obj.forsImpUltValua,
            descripcion: obj.forsTextoDescrip,
        };

        const id = [
            mappedObject.idFideicomiso,
            mappedObject.idSubcuenta,
            mappedObject.idTipoBien,
            mappedObject.tipoBien,
            mappedObject.idDetalleBien,
        ].join('-');

        return Object.assign(new DetalleBienResultRow(id), mappedObject);
    }
}
export default DetalleBienResultRow;
