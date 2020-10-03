import { MainIndividualizacionesState, ITableIndividualizacionesParameters, MainIndividualizacionesActions } from '../types';
import Individualizacion from '../../../../models/Individualizacion';
import IndividualizacionesResultRow from '../models/IndividualizacionesResultRow';
import { CrudModuleReducer } from '../../../../sharedComponents/CrudModule';

const reducerHelper = {
    mainModelFromRow: (selectedRow: IndividualizacionesResultRow) =>
        new Individualizacion(
            selectedRow.idFideicomiso,
            selectedRow.idSubcuenta,
            selectedRow.idBien,
            selectedRow.idEdificio,
            selectedRow.idDepto
        ),
    newModel: () => new Individualizacion(null, null, null, null, null),
};

function mainIndividualizacionesReducer(
    state: MainIndividualizacionesState,
    action: MainIndividualizacionesActions
): MainIndividualizacionesState {
    switch (action.type) {
        default:
            return CrudModuleReducer<
                Individualizacion,
                ITableIndividualizacionesParameters,
                IndividualizacionesResultRow
            >(state, action, reducerHelper);
    }
}

export { mainIndividualizacionesReducer };
