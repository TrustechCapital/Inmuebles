import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import DetalleBien from '../../../../models/DetalleBien';
import DetalleBienesModelMapper from './DetalleBienesModelMapper';
import { OperacionesCatalogoDetalleBienes } from '../constants';

class DetalleBienesApi extends ModelsApi<DetalleBien> {
    async find(
        parameters: ITableBienesParameters
    ): Promise<DetalleBienResultRow[]> {
        return await this.getRef(
            'consultarBienesGar',
            {
                Fiso: parameters.idFideicomiso,
                Subfiso: parameters.idSubcuenta,
                CveTipoGar: parameters.idTipoBien,
            },
            DetalleBienResultRow.fromObject
        );
    }

    /*
     * Se usa este metodo en vez de this.update() para permitir que la logica de negocio
     * se realice en una transacción.
     */
    async executeCrudOperation(
        model: DetalleBien,
        mode: OperacionesCatalogoDetalleBienes
    ): Promise<number> {
        const parameters = {
            detalleBien: JSON.stringify(
                DetalleBienesModelMapper.toObject(model)
            ),
            tipoOperacion: mode,
        };

        try {
            const newDetalleBienId: number = await this.executeRemoteMethod(
                'funEjecutaOperacionDetalleBienes',
                parameters
            );

            return newDetalleBienId;
        } catch (error) {
            throw new Error(
                'Los datos fueron guardados pero el proceso no fue completado. Intente nuevamente'
            );
        }
    }
}

export const detalleBienesApi = new DetalleBienesApi(DetalleBienesModelMapper);
