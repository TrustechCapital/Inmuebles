import { Api } from './base';
import Moneda from '../../models/Moneda';
import CacheService from '../../services/CacheService';

const MONEDAS_CACHE_KEY = 'catalogoMonedas';

class MonedasApi extends Api {
    constructor() {
        super({});
    }

    async fetchAll() {
        const datafromCache = CacheService.get(MONEDAS_CACHE_KEY);

        if (datafromCache) {
            return datafromCache;
        }

        const monedas = await this.getRef(
            'conNumMonNomMon',
            {},
            Moneda.fromObject
        );
        CacheService.set(MONEDAS_CACHE_KEY, monedas);
        return monedas;
    }
}

export const catalogsApi = new MonedasApi();
