class CatalogItem {
    catalogId: number;
    value: number;
    label: string;

    constructor(catalogId: number, value: number, label: string) {
        this.catalogId = catalogId;
        this.value = value;
        this.label = label;
    }

    public static fromObject(obj: any, index: number): CatalogItem {
        return {
            catalogId: obj.cveNumClave,
            value: obj.cveNumSecClave,
            label: obj.cveDescClave,
        };
    }
}
export default CatalogItem;
