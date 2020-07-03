import React, { useMemo, useCallback } from 'react';

import { ITableUsuariosParameters, MainUsuariosState } from './types';
import UsuariosResultRow from './models/UsuariosResultRow';
import TableUsuarios from './TableUsuarios';
import DialogUsuarios from './DialogUsuarios';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Usuarios from '../../../models/Usuarios';
import { mainUsuariosReducer } from './reducers';
import usuariosActions from './actions/usuarios';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { requestConfirmation } from '../../../sharedComponents/ConfirmationModal';
import { useGlobalNotification } from '../../../sharedHooks/globalMessages';
import { useEnhancedReducer } from '../../../sharedHooks/enhancedReducer';

const initialState: MainUsuariosState = {
    usuarios: {
        searchParameters: {
            nombreUsuario: null,
            numeroUsuario: null,
            perfilCliente: null,
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
    },
};

const MainUsuarios: React.FC = () => {
    const [state, dispatch, promiseDispatch] = useEnhancedReducer(
        mainUsuariosReducer,
        initialState
    );
    const { alertSuccess, alertError } = useGlobalNotification();

    const closeUsuariosModal = useCallback(() => {
        dispatch({
            type: 'CLOSE_USUARIOS_MODAL',
        });
    }, []);

    const saveUsuariosModel = useCallback((model: Usuarios) => {
        dispatch(usuariosActions.saveModel(model));
    }, []);

    const searchUsuarios = useCallback(
        (parameters: ITableUsuariosParameters) => {
            dispatch(usuariosActions.newSearchUsuarios(parameters));
        },
        []
    );

    const UsuariosActionCallbacks = useMemo(() => {
        return {
            onSelect: (selectedRows: UsuariosResultRow[]) => {
                dispatch(usuariosActions.selectUsuariosRow(selectedRows[0]));
            },
            onNew: () => {
                dispatch({
                    type: 'OPEN_USUARIOS_MODAL',
                    mode: OperacionesCatalogo.Alta,
                });
            },
            onView: () => {
                dispatch(
                    usuariosActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Consulta
                    )
                );
            },
            onModify: () => {
                dispatch(
                    usuariosActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Modificacion
                    )
                );
            },
            onDelete: async () => {
                const confirmed = await requestConfirmation();
                if (confirmed) {
                    promiseDispatch(usuariosActions.deleteSelectedModel())
                        .then(() => {
                            alertSuccess('Registros eliminados exitosamente');
                        })
                        .catch((e: Error) => {
                            alertError(e.message);
                        });
                }
            },
        };
    }, []);

    return (
        <React.Fragment>
            <GenericTableCallbacksContext.Provider
                value={UsuariosActionCallbacks}
            >
                <TableUsuarios
                    data={state.usuarios.searchResults}
                    onSearch={searchUsuarios}
                />
            </GenericTableCallbacksContext.Provider>
            <DialogUsuarios
                mode={state.usuarios.modalMode}
                open={state.usuarios.modalOpen}
                model={state.usuarios.currentModel}
                isLoading={state.usuarios.isLoadingModel}
                savingStatus={state.usuarios.savingStatus}
                errorMessage={state.usuarios.modalErrorMessage}
                onClose={closeUsuariosModal}
                onSaveRequest={saveUsuariosModel}
            />
        </React.Fragment>
    );
};

export default MainUsuarios;
