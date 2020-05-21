import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import Bien from '../../../../models/Bien';
import BienesModelMapper from './BienesModelMapper';

class DetalleBienesApi extends ModelsApi<Bien> {
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

export const detalleBienesApi = new DetalleBienesApi(BienesModelMapper);
