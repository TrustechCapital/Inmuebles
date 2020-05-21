import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import DetalleBien from '../../../../models/DetalleBien';
import DetalleBienesModelMapper from './DetalleBienesModelMapper';

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
}

export const detalleBienesApi = new DetalleBienesApi(DetalleBienesModelMapper);
