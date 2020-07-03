import { Api } from '../../../core/api';
import EjecutorPlanes from '../models/EjecutorPlanes';

class EjecutorPlanesApi extends Api {
    constructor() {
        super({});
    }

    async aplicaPlan(datosEjecutor: EjecutorPlanes): Promise<number> {
        var today = new Date(),
            date =
                today.getDate() +
                '/' +
                (today.getMonth() + 1) +
                '/' +
                today.getFullYear();
        const parameters = {
            fechaFront: date,
            fechaAplica: datosEjecutor.fecha,
        };
        try {
            const cierre: number = await this.executeRemoteMethod(
                'funEjecutaAperturaCierre',
                parameters
            );
            return cierre;
        } catch (error) {
            throw new Error(
                'No se pudo realizar la Apertura/Cierre. Intente nuevamente'
            );
        }
    }
}

export const ejecutorPlanesApi = new EjecutorPlanesApi();
