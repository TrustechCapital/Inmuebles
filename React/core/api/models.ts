import { Api } from './base';
import { IModel } from '../../models/BaseModel';

const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';

export interface IModelMapper<T> {
    fromObject: (data: any) => T;
    toObject: (model: T) => object;
}

interface IModelsApi<T extends IModel> {
    findByPK: (model: T, transformer: IModelMapper<T>) => Promise<T>;
    create: (model: T, transformer: IModelMapper<T>) => Promise<T>;
    update: (model: T, transformer: IModelMapper<T>) => Promise<T>;
    destroy: (model: T, transformer: IModelMapper<T>) => Promise<void>;
}

export class ModelsApi<T extends IModel> extends Api implements IModelsApi<T> {
    constructor() {
        super({});
    }

    private createBackendParameters(
        model: T,
        transformer: IModelMapper<T>,
        sendPkOnly: boolean = false
    ): object {
        const catalogParams = transformer.toObject(
            sendPkOnly ? (model.getPKValues() as T) : model
        );
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

    async findByPK(model: T, transformer: IModelMapper<T>): Promise<T> {
        return this.get(
            'obtenerCatalogo.do',
            this.createBackendParameters(model, transformer, true)
        ).then((response) => {
            return transformer.fromObject(response.data as object);
        });
    }

    async create(model: T, transformer: IModelMapper<T>): Promise<T> {
        return this.get(
            'altaCatalogo.do',
            this.createBackendParameters(model, transformer)
        ).then((response) => {
            return transformer.fromObject(response.data as object);
        });
    }

    async update(model: T, transformer: IModelMapper<T>): Promise<T> {
        return this.get(
            'modificaCatalogo.do',
            this.createBackendParameters(model, transformer)
        ).then((response) => {
            return transformer.fromObject(response.data as object);
        });
    }

    async destroy(model: T, transformer: IModelMapper<T>): Promise<void> {
        await this.get<void, void>(
            'modificaCatalogo.do',
            this.createBackendParameters(model, transformer, true)
        );
    }
}

export const modelsApi = new ModelsApi();
