import { ModelsApi } from '../../../../core/api';
import { ITableBienesParameters } from '../types';
import BienResultRow from '../models/BienResultRow';
import Bien from '../../../../models/Bien';
import BienesModelMapper from './BienesModelMapper';

class BienesApi extends ModelsApi<Bien> {
    getModelFromResultRow(parameters: ITableBienesParameters) {
        return new Bien(
            parameters.idFideicomiso,
            parameters.idSubcuenta,
            parameters.idTipoBien
        );
    }

    async exists(model: Bien): Promise<boolean> {

        if (!model.idFideicomiso || model.idSubcuenta === null || model.idSubcuenta === undefined || !model.idTipoBien) {
            return false;
        }

        return await this.getRef(
            'qryExisteBien',
            {
                idFideicomiso: model.idFideicomiso,
                idSubcuenta: model.idSubcuenta,
                idTipoBien: model.idTipoBien,
            },
            (data) => {
                return data;
            }
        ).then((data: any) => {
            return data[0].numRegistros >= 1;
        });
    }

    async find(parameters: ITableBienesParameters): Promise<BienResultRow[]> {
        return await this.getRef(
            'funRegistroGarantias',
            {
                IdFideicomiso: parameters.idFideicomiso,
                Subfiso: parameters.idSubcuenta,
                Garantia: parameters.idTipoBien,
            },
            BienResultRow.fromObject
        );
    }
}

export const bienesApi = new BienesApi(BienesModelMapper);
