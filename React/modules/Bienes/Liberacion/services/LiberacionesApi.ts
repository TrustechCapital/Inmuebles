import { ModelsApi } from '../../../../core/api';
import { ITableLiberacionesParameters } from '../types';
import LiberacionResultRow from '../models/LiberacionResultRow';
import Liberacion from '../../../../models/Individualizacion';
import LiberacionModelMapper from './LiberacionModelMapper';

class LiberacionesApi extends ModelsApi<Liberacion> {
    getModelFromResultRow(resultRow: LiberacionResultRow) {
        return new Liberacion(
            resultRow.idFideicomiso,
            resultRow.idSubcuenta,
            resultRow.idBien,
            resultRow.idEdificio,
            resultRow.idDepto
        );
    }

    async find(
        parameters: ITableLiberacionesParameters
    ): Promise<LiberacionResultRow[]> {
        return await this.getRef(
            'prinLiberacion',
            {
                NumFideicomiso: parameters.idFideicomiso,
                NumUnidad: parameters.idDepto,
                CveStatus: parameters.status,
            },
            LiberacionResultRow.fromObject
        );
    }
}

export const liberacionesApi = new LiberacionesApi(LiberacionModelMapper);
