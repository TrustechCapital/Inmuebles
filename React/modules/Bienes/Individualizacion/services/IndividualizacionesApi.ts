import { ModelsApi } from '../../../../core/api';
import { ITableIndividualizacionesParameters } from '../types';
import IndividualizacionResultRow from '../models/IndividualizacionesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import IndividualizacionModelMapper from './IndividualizacionModelMapper';
import { ICrudModuleApi } from '../../../../sharedComponents/CrudModule/types';
import DateUtils from '../../../../utils/DateUtils';

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
                numFideicomiso: parameters.idFideicomiso,
                idDepto: parameters.idDepto,
                calle: parameters.calleYNumero,
                estatus: parameters.status,
                numCatasttro: parameters.numeroCatastro,
                estado: parameters.estado,
                municipio: parameters.municipio,
                escriturado: parameters.escriturado ? 'SI' : 'NO',
                fechaEscritura: parameters.fechaEscritura ? DateUtils.fromDate(parameters.fechaEscritura) : null
            },
            IndividualizacionResultRow.fromObject
        );
    }
}

export const individualizacionesApi = new IndividualizacionesApi(
    IndividualizacionModelMapper
);
