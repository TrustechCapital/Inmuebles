import { Api } from './base';
import Planes from '../../models/Planes';
import CacheService from '../../services/CacheService';

const PLANES_CACHE_KEY = 'catalogoPlanes';

class PlanesApi extends Api {
    constructor() {
        super({});
    }

    async fetchAll() {
        const datafromCache = CacheService.get(PLANES_CACHE_KEY);

        if (datafromCache) {
            return datafromCache;
        }

        const planes = await this.getRef('conNomPla', {}, Planes.fromObject);
        CacheService.set(PLANES_CACHE_KEY, planes);
        return planes;
    }
}

export const planesApi = new PlanesApi();
