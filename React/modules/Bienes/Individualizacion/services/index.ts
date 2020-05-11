import { Api } from '../../../../core/api';
import { ITableIndivParameters } from '../types';
import IndividuaResultRow from '../models/IndividuaResultRow';

class IndividApi extends Api {
    constructor() {
        super({});
    }

    async find(
        parameters: ITableIndivParameters
    ): Promise<IndividuaResultRow[]> {
        const params = {
            NumFideicomiso: parameters.idFideicomiso,
            NumUnidad: parameters.idUnidad,
            CveStatus: parameters.idStatus,
        };
        return await this.getRef(
            'prinLiberacion',
            params,
            IndividuaResultRow.fromObject
        );
    }
}

export const individApi = new IndividApi();
