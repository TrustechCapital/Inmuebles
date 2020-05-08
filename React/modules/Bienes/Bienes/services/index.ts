import { Api } from '../../../../core/api';
import BienResultRow from '../models/BienResultRow';

export type BienesSearchParameters = {
    idFideicomiso: number;
    idSubcuenta: number;
    claveTipoBien: number;
};

class BienesApi extends Api {
    constructor() {
        super({});
    }

    async find(parameters: BienesSearchParameters): Promise<BienResultRow[]> {
        const params = {
            IdFideicomiso: parameters.idFideicomiso,
            Subfiso: parameters.idSubcuenta,
            Garantia: parameters.claveTipoBien,
        };
        return await this.getRef(
            'funRegistroGarantias',
            params,
            BienResultRow.fromObject
        );
    }
}

export const bienesApi = new BienesApi();
