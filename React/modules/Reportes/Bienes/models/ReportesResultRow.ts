class ReportesResultRow {
    id: number;
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

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): ReportesResultRow {
        return {
            id: index,
            idFideicomiso: obj.funiIdFideicomiso,
            nomFiso: obj.ctoNomContrato,
            descripInmueble: obj.forsTextoDescrip,
            idTipoBien: obj.forsCveTipoGarantia,
            descripcionTipoBien: obj.descripcionClaveTipoBien,
            ultimoAvaluo: obj.funiUltimoAvaluo,
            tipoValor: obj.funiTipo,
            moneda: obj.funiMoneda,
            fechaAportacion: obj.funifechaUltimoAvaluo,
            numCatastro: obj.funiNumCatastro,
            adquiriente: obj.funiNombreAdquiriente,
            estado: obj.funiNumEstado,
            municipio: obj.funiNomPoblacion,
            status: obj.funiStatus,
        };
    }
}
export default ReportesResultRow;
