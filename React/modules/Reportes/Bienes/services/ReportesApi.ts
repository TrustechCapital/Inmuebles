import { ModelsApi } from '../../../../core/api';
import { ITableReportesParameters } from '../types';
import ReportesResultRow from '../models/ReportesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import ReportesModelMapper from './ReportesModelMapper';

class ReportesApi extends ModelsApi<Individualizacion> {
    getModelFromResultRow(resultRow: ReportesResultRow) {
        return new Individualizacion(
            resultRow.idFideicomiso,
            null,
            null,
            null,
            null
        );
    }

    async find(
        parameters: ITableReportesParameters
    ): Promise<ReportesResultRow[]> {
        return await this.getRef(
            'reporteLibera',
            {
                numFiso: parameters.idFideicomiso,
                cveGarantia: parameters.cveGarantia,
                numCatastro: parameters.numCatastro,
                tipo: parameters.tipoInmueble,
                cveStatus: parameters.status,
            },
            ReportesResultRow.fromObject
        );
    }
    //TODO: ESTRUCTURAR URL PARA INVOCAR EL PRINT DEL PDF
    async findPDF() {
        return await this.imprimir('reporteLibera', {
            template: '/xml/Reportes/Honorarios/ReporteBienes.xsl',
        });
    }
}

export const reportesApi = new ReportesApi(ReportesModelMapper);
