import { Api } from './base';
class FideicomisosApi extends Api {
    constructor() {
        super({});
    }

    async exists(numFideicomiso: number): Promise<boolean> {
        return await this.getRef(
            'verificaExistenciaContrato',
            {
                numContrato: numFideicomiso
            },
            (data) => {
                return data;
            }
            
        ).then((data: any) => {
            return data[0].ctoNumContrato === 1;
        });
    }
}

export const fideicomisosApi = new FideicomisosApi();
