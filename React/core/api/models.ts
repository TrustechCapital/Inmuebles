import { Api } from './base';
import { IModel } from '../../models/BaseModel';

const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';

type BackendGenericCatalog = {
    claseCatalogo: string;
    catalogo: string;
    dateFormat: string;
};

interface IModelsApi {}

export class ModelsApi<T extends IModel> extends Api implements IModelsApi {
    constructor() {
        super({});
    }

    async findByPK(model: T, transformer: (data: object) => T): Promise<T> {
        let pkParams = model.getPKValues();

        // Se arma la estructura requerida por el backend
        const params: BackendGenericCatalog = {
            dateFormat: DEFAULT_DATE_FORMAT,
            catalogo: JSON.stringify(pkParams),
            claseCatalogo: model.backendModelReference,
        };

        return this.get('obtenerCatalogo.do', {
            params: {
                json: JSON.stringify(params),
            },
        }).then((response) => {
            return transformer(response.data as object);
        });
    }
}

export const modelsApi = new ModelsApi();
