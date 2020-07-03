import { Api } from './base';
import Estados from '../../models/Estados';
import CacheService from '../../services/CacheService';

const ESTADOS_CACHE_KEY = 'catalogoEstados';

class EstadosApi extends Api {
    constructor() {
        super({});
    }

    async fetchAll() {
        const datafromCache = CacheService.get(ESTADOS_CACHE_KEY);

        if (datafromCache) {
            return datafromCache;
        }

        const estados = await this.getRef(
            'claveEstado',
            {},
            Estados.fromObject
        );
        CacheService.set(ESTADOS_CACHE_KEY, estados);
        return estados;
    }
}

export const estadosApi = new EstadosApi();
