import React from 'react';

import {
    MainIndividualizacionesState,
} from './types';
import TableIndividualizaciones from './TableIndividualizacion';
import DialogIndividualizaciones from './DialogIndividualizacion';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Individualizacion from '../../../models/Individualizacion';
import { mainIndividualizacionesReducer } from './reducers';
import IndividualizacionesActions from './actions';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { useCrudModule } from '../../../sharedComponents/CrudModule';

const initialState: MainIndividualizacionesState = {
    searchParameters: {
        idFideicomiso: null,
        idDepto: '',
        calleYNumero: '',
        status: '',
        numeroCatastro: null,
        estado: '',
        municipio: ''
    },
    searchResults: [],
    selectedRow: null,
    currentModel: new Individualizacion(null, null, null, null, null),
    modalMode: OperacionesCatalogo.Alta,
    modalOpen: false,
    isLoadingModel: false,
    savingStatus: SavingStatus.Initial,
    modalErrorMessage: null,
};

const MainIndividualizaciones: React.FC = () => {
    const [state, callbacks] = useCrudModule(
        mainIndividualizacionesReducer,
        initialState,
        new IndividualizacionesActions()
    );

    return (
        <React.Fragment>
            <GenericTableCallbacksContext.Provider
                value={callbacks.tableCallbacks}
            >
                <TableIndividualizaciones
                    data={state.searchResults}
                    onSearch={callbacks.onSearch}
                />
            </GenericTableCallbacksContext.Provider>
            <DialogIndividualizaciones
                mode={state.modalMode}
                open={state.modalOpen}
                model={state.currentModel}
                isLoading={state.isLoadingModel}
                savingStatus={state.savingStatus}
                errorMessage={state.modalErrorMessage}
                onClose={callbacks.onCloseModal}
                onSaveRequest={callbacks.onSave}
            />
        </React.Fragment>
    );
};

export default MainIndividualizaciones;
