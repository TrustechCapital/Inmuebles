import { ModelsApi } from '../../../../core/api';
import { ITablePolizaParameters } from '../types';
import PolizaResultRow from '../models/PolizaResultRow';
import Movimientos from '../../../../models/Movimientos';
import PolizaModelMapper from './PolizaModelMapper';

class PolizaApi extends ModelsApi<Movimientos> {
    getModelFromResultRow(resultRow: PolizaResultRow) {
        return new Movimientos(null, null, null, null, null, null, null, null);
    }

    async find(parameters: ITablePolizaParameters): Promise<PolizaResultRow[]> {
        return await this.getRef(
            'conPolizaContable',
            {
                Anio: parameters.Anio,
                Mes: parameters.Mes,
                Dia: parameters.Dia,
            },
            PolizaResultRow.fromObject
        );
    }
}

export const reportesApi = new PolizaApi(PolizaModelMapper);
