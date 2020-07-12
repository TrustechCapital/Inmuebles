import {
    MainFideicomisosState,
    MainFideicomisosActions,
    ITableFideicomisosParameters,
} from '../types';

import { CrudModuleReducer } from '../../../../sharedComponents/CrudModule';
import Fideicomiso from '../../../../models/Fideicomiso';
import FideicomisoResultRow from '../models/FideicomisoResultRow';

const reducerHelper = {
    mainModelFromRow: (selectedRow: FideicomisoResultRow) =>
        new Fideicomiso(
            selectedRow.idFideicomiso,
            selectedRow.nombreFideicomiso
        ),
    newModel: () => new Fideicomiso(null, null),
};

function mainIndividualizacionesReducer(
    state: MainFideicomisosState,
    action: MainFideicomisosActions
): MainFideicomisosState {
    switch (action.type) {
        default:
            return CrudModuleReducer<
                Fideicomiso,
                ITableFideicomisosParameters,
                FideicomisoResultRow
            >(state, action, reducerHelper);
    }
}

export { mainIndividualizacionesReducer };
