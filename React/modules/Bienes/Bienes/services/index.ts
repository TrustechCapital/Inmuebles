import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import BienResultRow from '../models/BienResultRow';
import Bien from '../../../..//models/Bien';

function objectToModel(data: any): Bien {
    return data as Bien;
}

class BienesApi extends ModelsApi<Bien> {
    async find(parameters: ITableBienesParameters): Promise<BienResultRow[]> {
        const params = {
            IdFideicomiso: parameters.idFideicomiso,
            Subfiso: parameters.idSubcuenta,
            Garantia: parameters.idTipoBien,
        };
        return await this.getRef(
            'funRegistroGarantias',
            params,
            BienResultRow.fromObject
        );
    }

    async findByPK(model: Bien): Promise<Bien> {
        return await super.findByPK(model, objectToModel);
    }
}

export const bienesApi = new BienesApi();
