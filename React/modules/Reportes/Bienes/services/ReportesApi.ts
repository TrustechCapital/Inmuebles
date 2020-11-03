import { ModelsApi } from '../../../../core/api';
import { ITableReportesParameters } from '../types';
import ReportesResultRow from '../models/ReportesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import { IModelMapper } from '../../../../core/api';

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
                tipoBien: parameters.idTipoBien,
                numCatastro: parameters.numCatastro,
                cveStatus: parameters.status,
            },
            ReportesResultRow.fromObject
        );
    }

    async downloadReport(parameters: ITableReportesParameters) {
        this.downloadDynamicReport('Reporte de liberación de bienes.pdf', 'reporteLibera', {
            template: '/xml/Reportes/Honorarios/ReporteBienes.xsl',
            takeParameters: 'false',
            numFiso: parameters.idFideicomiso,
            tipoBien: parameters.idTipoBien,
            numCatastro: parameters.numCatastro,
            cveStatus: parameters.status,
        });
    }
}

class ReportesModelMapper implements IModelMapper<Individualizacion> {
    fromObject(data: any) {
        return new Individualizacion(null, null, null, null, null);
    }

    toObject(individualizacion: Individualizacion, pkOnly: boolean = false) {
        return {};
    }
}

export const reportesApi = new ReportesApi(new ReportesModelMapper());
