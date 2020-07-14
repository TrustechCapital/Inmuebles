import React from 'react';

import TableFideicomisos from './TableFideicomisos';
import { mainIndividualizacionesReducer } from './reducers';
import IndividualizacionesActions from './actions';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import {
    useCrudModule,
    crudModuleInitialState,
} from '../../../sharedComponents/CrudModule';
import { MainFideicomisosState } from './types';
import Fideicomiso from '../../../models/Fideicomiso';
import DialogFideicomisos from './DialogFideicomisos';

const initialState: MainFideicomisosState = {
    ...crudModuleInitialState,
    searchParameters: {
        idFideicomiso: null,
        nombreFideicomiso: '',
    },
    currentModel: new Fideicomiso(null, null),
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
                <TableFideicomisos
                    data={state.searchResults}
                    onSearch={callbacks.onSearch}
                />
            </GenericTableCallbacksContext.Provider>
            <DialogFideicomisos
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
