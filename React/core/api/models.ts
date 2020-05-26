import { Api } from './base';
import { IModel } from '../../models/BaseModel';
import { BatchOperationError } from './exceptions';

const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';

export interface IModelMapper<T> {
    fromObject: (data: any) => T;
    toObject: (model: T, pkOnly: boolean) => object;
}

type ModelOptions<T> = {
    transformer?: IModelMapper<T> | null;
};

interface IModelsApi<T extends IModel> {
    findByPK: (model: T, options?: ModelOptions<T>) => Promise<T>;
    create: (model: T, options?: ModelOptions<T>) => Promise<T>;
    update: (model: T, options?: ModelOptions<T>) => Promise<T>;
    destroy: (model: T, options?: ModelOptions<T>) => Promise<void>;
}

export class ModelsApi<T extends IModel> extends Api implements IModelsApi<T> {
    transformer: IModelMapper<T>;
    constructor(transformer: IModelMapper<T>) {
        super({});
        this.transformer = transformer;
    }

    private createBackendParameters(
        model: T,
        transformer: IModelMapper<T>,
        sendPkOnly: boolean = false
    ): object {
        const catalogParams = transformer.toObject(model, sendPkOnly);
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

    private getTransformer(options?: ModelOptions<T>) {
        return options && options.transformer
            ? options.transformer
            : this.transformer;
    }

    async findByPK(model: T, options?: ModelOptions<T>): Promise<T> {
        const transformer = this.getTransformer();
        return this.get(
            'obtenerCatalogo.do',
            this.createBackendParameters(model, transformer, true)
        ).then((response) => {
            return transformer.fromObject(response.data as object);
        });
    }

    async create(model: T, options?: ModelOptions<T>): Promise<T> {
        const transformer = this.getTransformer();
        return this.get(
            'altaCatalogo.do',
            this.createBackendParameters(model, transformer)
        ).then((response) => {
            return transformer.fromObject(response.data as object);
        });
    }

    async update(model: T, options?: ModelOptions<T>): Promise<T> {
        const transformer = this.getTransformer();
        return this.get(
            'modificaCatalogo.do',
            this.createBackendParameters(model, transformer)
        ).then(() => {
            return model;
        });
    }

    async destroy(model: T, options?: ModelOptions<T>): Promise<void> {
        const transformer = this.getTransformer();
        await this.get<void, void>(
            'bajaCatalogo.do',
            this.createBackendParameters(model, transformer, true)
        );
    }

    async destroyMany(models: T[]): Promise<void> {
        const allPromises = models.reduce(
            (promises: Promise<void>[], model) => {
                promises.push(this.destroy(model));
                return promises;
            },
            []
        );

        return Promise.allSettled(allPromises).then((results) => {
            let failedModels: T[] = [];

            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    failedModels.push(models[index]);
                }
            });

            if (failedModels.length) {
                const errorMessage = `Operacion incompleta. Ocurrio un error al eliminar ${failedModels.length} de ${models.length} registro(s).`;
                throw new BatchOperationError(failedModels, errorMessage);
            }
        });
    }
}

export default ModelsApi;
