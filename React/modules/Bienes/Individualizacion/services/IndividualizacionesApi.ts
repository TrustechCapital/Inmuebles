import { ModelsApi } from '../../../../core/api';
import { ITableIndividualizacionesParameters } from '../types';
import IndividualizacionResultRow from '../models/IndividualizacionesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import IndividualizacionModelMapper from './IndividualizacionModelMapper';
import { ICrudModuleApi } from '../../../../sharedComponents/CrudModule/types';

class IndividualizacionesApi extends ModelsApi<Individualizacion> implements
ICrudModuleApi<
    Individualizacion,
    ITableIndividualizacionesParameters,
    IndividualizacionResultRow
>{
    getModelFromResultRow(resultRow: IndividualizacionResultRow) {
        return new Individualizacion(
            resultRow.idFideicomiso,
            resultRow.idSubcuenta,
            resultRow.idBien,
            resultRow.idEdificio,
            resultRow.idDepto
        );
    }

    async exists(model: Individualizacion): Promise<boolean> {
        // TODO: Validar si la unidad ya existe
        return false;
    }

    async find(
        parameters: ITableIndividualizacionesParameters
    ): Promise<IndividualizacionResultRow[]> {
        return await this.getRef(
            'qryConsultaUnidades',
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
