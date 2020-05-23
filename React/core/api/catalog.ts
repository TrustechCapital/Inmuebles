import { Api } from './base';
import CatalogItem from '../../models/CatalogItem';
import CacheService from '../../services/CacheService';

class CatalogNotFoundException extends Error {
    constructor(catalogId: number) {
        super(`La clave de catalogo ${catalogId} no existe`);
    }
}

const CATALOGS_CACHE_KEY = 'catalogoClaves';

class CatalogsApi extends Api {
    private cachedClavesCatalog: Map<number, CatalogItem[]> = new Map();

    constructor() {
        super({});
    }

    async fetchAll(): Promise<CatalogItem[]> {
        let results: CatalogItem[] | null = CacheService.get(
            CATALOGS_CACHE_KEY
        );

        if (!results) {
            results = await this.getRef<CatalogItem>(
                'catalogoCompletoclaves',
                {},
                CatalogItem.fromObject
            );

            CacheService.set(CATALOGS_CACHE_KEY, results);
        }

        const catalogsMap = results.reduce((prev, catalog) => {
            if (!prev.has(catalog.catalogId)) {
                prev.set(catalog.catalogId, [catalog]);
            } else {
                let currentValues = prev.get(catalog.catalogId) || [];
                currentValues?.push(catalog);
                prev.set(catalog.catalogId, currentValues);
            }

            return prev;
        }, new Map<number, CatalogItem[]>());

        this.cachedClavesCatalog = catalogsMap;

        return results;
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

    getChildCatalog(
        parentCatalogId: number | null,
        parentValue?: number | string | null
    ): CatalogItem[] {
        if (parentCatalogId === null) {
            return [];
        }

        if (!this.cachedClavesCatalog.has(parentCatalogId)) {
            throw new CatalogNotFoundException(parentCatalogId);
        }
        const parentCatalogItems =
            this.cachedClavesCatalog.get(parentCatalogId) || [];

        const parentItemSelected = parentCatalogItems.find((catalogItem) => {
            return catalogItem.value === parentValue;
        });

        if (!parentItemSelected || !parentItemSelected.childCatalogId)
            return [];

        try {
            const childCatalogId = parseInt(
                parentItemSelected.childCatalogId,
                0
            );

            return this.getCatalogById(childCatalogId);
        } catch (error) {
            return [];
        }
    }
}

export const catalogsApi = new CatalogsApi();
