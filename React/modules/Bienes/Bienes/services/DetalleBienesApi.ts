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

    async getNextId(
        idFideicomiso: number,
        idSubcuenta: number,
        idTipoBien: number
    ): Promise<number> {
        return this.getRef<number>(
            'consultaSigBienesGar',
            {
                Fiso: idFideicomiso,
                SubFiso: idSubcuenta,
                CveTipoGar: idTipoBien,
            },
            (data) => {
                return data.idSigBien;
            }
        ).then((data) => {
            return data[0];
        });
    }

    async updateWithBussinessLogic(
        model: DetalleBien,
        mode: OperacionesCatalogoDetalleBienes
    ) {
        await this.update(model);
        const parameters = {
            ...model,
            tipoOperacion: mode,
        };

        try {
            await this.executeRef('funRegistroBienesGar', parameters);
        } catch (error) {
            throw new Error(
                'Los datos fueron guardados pero el proceso no fue completado. Intente nuevamente'
            );
        }
    }
}

export const detalleBienesApi = new DetalleBienesApi(DetalleBienesModelMapper);
