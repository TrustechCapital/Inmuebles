import { Api } from './base';
import Paises from '../../models/Paises';
import CacheService from '../../services/CacheService';

const PAISES_CACHE_KEY = 'catalogoPaises';

class PaisesApi extends Api {
    constructor() {
        super({});
    }

    async fetchAll() {
        const datafromCache = CacheService.get(PAISES_CACHE_KEY);

        if (datafromCache) {
            return datafromCache;
        }

        const paises = await this.getRef('clavePaisCat', {}, Paises.fromObject);
        CacheService.set(PAISES_CACHE_KEY, paises);
        return paises;
    }
}

export const paisesApi = new PaisesApi();
