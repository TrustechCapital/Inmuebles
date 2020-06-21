import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters, RevaluacionDetalleBien } from '../types';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import DetalleBien from '../../../../models/DetalleBien';
import DetalleBienesModelMapper from './DetalleBienesModelMapper';
import { OperacionesCatalogoDetalleBienes } from '../constants';
import DateUtils from '../../../../utils/DateUtils';

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
        mode: OperacionesCatalogoDetalleBienes,
        revaluacionDetalleBien?: RevaluacionDetalleBien
    ): Promise<number> {
        const esRevaluacion =
            mode === OperacionesCatalogoDetalleBienes.Revaluacion;

        const parameters = {
            detalleBien: JSON.stringify(
                DetalleBienesModelMapper.toObject(model, esRevaluacion)
            ),
            tipoOperacion: mode,
            importeValuacion: revaluacionDetalleBien
                ? revaluacionDetalleBien.importeRevaluacion
                : null,
            fechaValuacion: revaluacionDetalleBien
                ? DateUtils.fromDate(
                      revaluacionDetalleBien.fechaRevaluacion as Date
                  )
                : null,
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

    /*
     * Se usa este metodo en vez de this.update() para permitir que la logica de negocio
     * se realice en una transacción.
     */
    async executeMultipleDeleteOperation(models: DetalleBien[]): Promise<void> {
        const allPromises = models.reduce((promises: Promise<any>[], model) => {
            promises.push(
                this.executeCrudOperation(
                    model,
                    OperacionesCatalogoDetalleBienes.Salida
                )
            );
            return promises;
        }, []);

        return this.handleBatchOperation(allPromises, models);
    }
}

export const detalleBienesApi = new DetalleBienesApi(DetalleBienesModelMapper);
