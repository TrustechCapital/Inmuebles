import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import BienResultRow from '../models/BienResultRow';
import Bien from '../../../../models/Bien';
import BienesModelMapper from './BienesModelMapper';

class BienesApi extends ModelsApi<Bien> {
    async find(parameters: ITableBienesParameters): Promise<BienResultRow[]> {
        return await this.getRef(
            'funRegistroGarantias',
            {
                IdFideicomiso: parameters.idFideicomiso,
                Subfiso: parameters.idSubcuenta,
                Garantia: parameters.idTipoBien,
            },
            BienResultRow.fromObject
        );
    }

    async findByPK(model: Bien): Promise<Bien> {
        return await super.findByPK(model, BienesModelMapper);
    }
}

export const bienesApi = new BienesApi();
