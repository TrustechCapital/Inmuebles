import { ModelsApi } from '../../../../core/api';
import { ITableIndividualizacionesParameters } from '../types';
import IndividualizacionResultRow from '../models/IndividualizacionesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import IndividualizacionModelMapper from './IndividualizacionModelMapper';

class IndividualizacionesApi extends ModelsApi<Individualizacion> {
    getModelFromResultRow(resultRow: IndividualizacionResultRow) {
        return new Individualizacion(
            resultRow.idFideicomiso,
            resultRow.idSubcuenta,
            resultRow.idBien,
            resultRow.idEdificio,
            resultRow.idDepto
        );
    }

    async find(
        parameters: ITableIndividualizacionesParameters
    ): Promise<IndividualizacionResultRow[]> {
        return await this.getRef(
            'prinUnidades',
            {
                NumFideicomiso: parameters.idFideicomiso,
                NumUnidad: parameters.idDepto,
                Calle: parameters.calleYNumero,
                CveStatus: parameters.status,
            },
            IndividualizacionResultRow.fromObject
        );
    }
}

export const individualizacionesApi = new IndividualizacionesApi(
    IndividualizacionModelMapper
);
