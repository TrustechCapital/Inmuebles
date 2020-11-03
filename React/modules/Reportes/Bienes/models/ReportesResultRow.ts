import ResultRowModel from "../../../../models/ResultRowModel";

class ReportesResultRow extends ResultRowModel{
    idFideicomiso: number | null = null;
    nomFiso: number | null = null;
    descripInmueble = '';
    idTipoBien: number | null = null;
    descripcionTipoBien = '';
    ultimoAvaluo = '';
    tipoValor = '';
    moneda = '';
    fechaAportacion = '';
    numCatastro: number | null = null;
    adquiriente = '';
    estado = '';
    municipio = '';
    status = '';

    public static fromObject(obj: any, index: number): ReportesResultRow {
        const mappedObject = {
            idFideicomiso: obj.funiIdFideicomiso,
            nomFiso: obj.ctoNomContrato,
            descripInmueble: obj.forsTextoDescrip,
            idTipoBien: obj.forsCveTipoGarantia,
            descripcionTipoBien: obj.descripcionClaveTipoBien,
            ultimoAvaluo: obj.funiUltimoAvaluo,
            tipoValor: obj.funiTipo,
            moneda: obj.funiMoneda,
            fechaAportacion: obj.funifechaUltimoAvaluo,
            numCatastro: obj.funiNumeroCatastro,
            adquiriente: obj.funiNombreAdquiriente,
            estado: obj.funiNumEstado,
            municipio: obj.funiNomPoblacion,
            status: obj.funiStatus,
        };

        const id = [
            mappedObject.idFideicomiso,
            mappedObject.idTipoBien,
            mappedObject.numCatastro,
        ].join('-');

        return Object.assign(new ReportesResultRow(id), mappedObject);
    }
}
export default ReportesResultRow;
