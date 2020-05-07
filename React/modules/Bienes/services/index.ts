import { Api } from '../../../core/api';
import GarantiaResultRow from '../models/GarantiaResultRow';

export type GarantiasSearchParameters = {
    idFideicomiso: number;
    idSubcuenta: number;
    claveGarantia: number;
};

class GarantiasApi extends Api {
    constructor() {
        super({});
    }

    async find(
        parameters: GarantiasSearchParameters
    ): Promise<GarantiaResultRow[]> {
        const params = {
            IdFideicomiso: parameters.idFideicomiso,
            Subfiso: parameters.idSubcuenta,
            Garantia: parameters.claveGarantia,
        };
        return await this.getRef(
            'funRegistroGarantias',
            params,
            GarantiaResultRow.fromObject
        );
    }
}

export const garantiasApi = new GarantiasApi();
