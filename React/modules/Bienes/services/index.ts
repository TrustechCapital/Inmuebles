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

class GarantiasApi extends Api {
    constructor() {
        super({});
    }

    async findAll(): Promise<BienResultRow[]> {
        return await this.get('getRef.do?json={"id":"funRegistroGarantias"}', {
            transformResponse: (rawdata: string) => {
                const data: Object[] = JSON.parse(rawdata);
                return data.map((row, index) => {
                    let garantia = new BienResultRow(row);
                    garantia.id = index;
                    return garantia;
                });
            },
        });
    }
}

export const garantiasApi = new GarantiasApi();
