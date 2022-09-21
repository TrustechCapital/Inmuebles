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

    async getName(numFideicomiso: number): Promise<string> {
        return await this.getRef(
            'conNomFid2',
            {
                numFideicomiso: numFideicomiso
            },
            (data) => {
                return data;
            }
            
        ).then((data: any) => {
            return (data === null || data.length !== 1) ? 'No existe el Fideicomiso' : data[0].nombre;
        });
    }
}

export const fideicomisosApi = new FideicomisosApi();
