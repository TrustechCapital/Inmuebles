import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import BienResultRow from '../models/BienResultRow';
import Bien from '../../../../models/Bien';
import BienesModelMapper from './BienesModelMapper';

class BienesApi extends ModelsApi<Bien> {
    getModelFromResultRow(parameters: ITableBienesParameters) {
        return new Bien(
            parameters.idFideicomiso,
            parameters.idSubcuenta,
            parameters.idTipoBien
        );
    }

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
}

export const bienesApi = new BienesApi(BienesModelMapper);
