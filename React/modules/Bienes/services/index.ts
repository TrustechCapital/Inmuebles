import { Api } from '../../../core/api';

class BienResultRow {
    id?: number;
    fgarIdFideicomiso?: number;
    fgarIdSubcuenta?: number;
    fgarCveGarantia?: number;
    fgarCveGarantia2?: string;
    fgarCveStatus?: string;
    disponibleBien?: string;
    fgarImpGarantia?: number;
    fgarImpGarantiaFormatted?: string;
    fgarImpGarantizad?: number;
    fgarImpGarantizadFormatted?: string;
    pagosBien?: string;
    ctoNumEscritura?: string;

    constructor(data: Object) {
        Object.assign(this, data);
    }
}

/*type ParametrosBusqueda = {
    idFideicomiso: number;
    idSubcuenta: number;
    idGarantia: number;
};
*/

class GarantiasApi extends Api {
    constructor() {
        super({});
    }

    async findAll(): Promise<BienResultRow[]> {
        const params = {
            IdFideicomiso: 10,
            Subfiso: null,
            Garantia: null,
        };
        return await this.getRef('funRegistroGarantias', params);
    }
}

export const garantiasApi = new GarantiasApi();
