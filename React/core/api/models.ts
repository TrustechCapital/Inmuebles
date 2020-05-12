import { Api } from './base';
import { IModel } from '../../models/BaseModel';

const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';

interface IModelsApi<T extends IModel> {
    findByPK: (model: T, transformer: (data: object) => T) => Promise<T>;
    create: (model: T, transformer: (data: object) => T) => Promise<T>;
    update: (model: T, transformer: (data: object) => T) => Promise<T>;
    destroy: (model: T) => Promise<void>;
}

export class ModelsApi<T extends IModel> extends Api implements IModelsApi<T> {
    constructor() {
        super({});
    }

    private createBackendParameters(
        model: T,
        sendPkOnly: boolean = false
    ): object {
        const catalogParams = sendPkOnly ? model.getPKValues() : model;
        return {
            params: {
                json: JSON.stringify({
                    dateFormat: DEFAULT_DATE_FORMAT,
                    catalogo: JSON.stringify(catalogParams),
                    claseCatalogo: model.backendModelReference,
                }),
            },
        };
    }

    async findByPK(model: T, transformer: (data: object) => T): Promise<T> {
        return this.get(
            'obtenerCatalogo.do',
            this.createBackendParameters(model, true)
        ).then((response) => {
            return transformer(response.data as object);
        });
    }

    async create(model: T, transformer: (data: object) => T): Promise<T> {
        return this.get(
            'altaCatalogo.do',
            this.createBackendParameters(model)
        ).then((response) => {
            return transformer(response.data as object);
        });
    }

    async update(model: T, transformer: (data: object) => T): Promise<T> {
        return this.get(
            'modificaCatalogo.do',
            this.createBackendParameters(model)
        ).then((response) => {
            return transformer(response.data as object);
        });
    }

    async destroy(model: T): Promise<void> {
        await this.get<void, void>(
            'modificaCatalogo.do',
            this.createBackendParameters(model, true)
        );
    }
}

export const modelsApi = new ModelsApi();
