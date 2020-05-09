import { Api } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import BienResultRow from '../models/BienResultRow';

class BienesApi extends Api {
    constructor() {
        super({});
    }

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
}

export const bienesApi = new BienesApi();
