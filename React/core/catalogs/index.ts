import { Api } from '../api';
import CatalogItem from '../../models/CatalogItem';

class CatalogNotFoundException extends Error {
    constructor(catalogId: number) {
        super(`La clave de catalogo ${catalogId} no existe`);
    }
}

class CatalogsApi extends Api {
    private cachedClavesCatalog: Map<number, CatalogItem[]> = new Map();

    constructor() {
        super({});
    }

    fetchAllCatalogs() {
        return this.fetchClavesCatalog();
    }

    getCachedCatalogs() {
        return this.cachedClavesCatalog;
    }

    getCatalogById(id: number): CatalogItem[] {
        if (!this.cachedClavesCatalog.has(id)) {
            throw new CatalogNotFoundException(id);
        }
        return this.cachedClavesCatalog.get(id) || [];
    }

    private async fetchClavesCatalog() {
        const results = await this.getRef<CatalogItem>(
            'catalogoCompletoclaves',
            {},
            CatalogItem.fromObject
        );

        this.cachedClavesCatalog = results.reduce((prev, catalog) => {
            if (!prev.has(catalog.catalogId)) {
                prev.set(catalog.catalogId, [catalog]);
            } else {
                let currentValues = prev.get(catalog.catalogId) || [];
                currentValues?.push(catalog);
                prev.set(catalog.catalogId, currentValues);
            }

            return prev;
        }, new Map<number, CatalogItem[]>());
    }
}

export const catalogsApi = new CatalogsApi();
