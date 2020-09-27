import { ModelsApi } from '../../../../core/api';
import { fideicomisosApi as commonFideicomisosApi } from '../../../../core/api/fideicomisos';
import { ITableFideicomisosParameters } from '../types';
import FideicomisoResultRow from '../models/FideicomisoResultRow';
import FideicomisosModelMapper from './FideicomisosModelMapper';
import { ICrudModuleApi } from '../../../../sharedComponents/CrudModule/types';
import Fideicomiso from '../../../../models/Fideicomiso';

class FideicomisosApi extends ModelsApi<Fideicomiso>
    implements
        ICrudModuleApi<
            Fideicomiso,
            ITableFideicomisosParameters,
            FideicomisoResultRow
        > {
    getModelFromResultRow(resultRow: FideicomisoResultRow) {
        return new Fideicomiso(
            resultRow.idFideicomiso,
            resultRow.nombreFideicomiso
        );
    }

    async exists(model: Fideicomiso): Promise<boolean> {

        if (!model.id) {
            return false;
        }

        return await commonFideicomisosApi.exists(model.id);
    }

    async find(
        parameters: ITableFideicomisosParameters
    ): Promise<FideicomisoResultRow[]> {
        return await this.getRef(
            'muestraDatosFideicomisos',
            {
                NumFideicomiso: parameters.idFideicomiso,
                Nombre: parameters.nombreFideicomiso,
            },
            FideicomisoResultRow.fromObject
        );
    }
}

export const fideicomisosApi = new FideicomisosApi(FideicomisosModelMapper);
