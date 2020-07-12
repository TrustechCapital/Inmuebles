import FideicomisoResultRow from '../models/FideicomisoResultRow';
import Fideicomiso from '../../../../models/Fideicomiso';
import { fideicomisosApi } from '../services/FideicomisosApi';
import { ITableFideicomisosParameters } from '../types';
import { CrudActions } from '../../../../sharedComponents/CrudModule';

export default class FideicomisoActions extends CrudActions<
    Fideicomiso,
    ITableFideicomisosParameters,
    FideicomisoResultRow,
    typeof fideicomisosApi
> {
    constructor() {
        super(fideicomisosApi);
    }

    async fetchFullModel(
        selectedRow: FideicomisoResultRow | null
    ): Promise<Fideicomiso | null> {
        if (!selectedRow) {
            return null;
        }

        let fideicomiso = new Fideicomiso(
            selectedRow.idFideicomiso,
            selectedRow.nombreFideicomiso
        );

        return await fideicomisosApi.findByPK(fideicomiso);
    }
}
