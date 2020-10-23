import React from 'react';

import { MainUsuariosState } from './types';
import TableUsuarios from './TableUsuarios';
import DialogUsuarios from './DialogUsuarios';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Usuarios from '../../../models/Usuarios';
import { mainUsuariosReducer } from './reducers';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { useCrudModule } from '../../../sharedComponents/CrudModule';
import UsuariosActions from './actions';

const initialState: MainUsuariosState = {
    searchParameters: {
        nombreUsuario: null,
        idUsuario: null,
        idPerfil: null,
        status: null,
    },
    searchResults: [],
    selectedRow: null,
    currentModel: new Usuarios(null),
    modalMode: OperacionesCatalogo.Alta,
    modalOpen: false,
    isLoadingModel: false,
    savingStatus: SavingStatus.Initial,
    modalErrorMessage: null,
};

const MainUsuarios: React.FC = () => {
    const [state, callbacks] = useCrudModule(
        mainUsuariosReducer,
        initialState,
        new UsuariosActions()
    );

    return (
        <React.Fragment>
            <GenericTableCallbacksContext.Provider
                value={callbacks.tableCallbacks}
            >
                <TableUsuarios
                    data={state.searchResults}
                    onSearch={callbacks.onSearch}
                />
            </GenericTableCallbacksContext.Provider>
            <DialogUsuarios
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

export default MainUsuarios;
