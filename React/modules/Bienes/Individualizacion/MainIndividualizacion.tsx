import React, { useMemo, useCallback } from 'react';

import {
    ITableIndividualizacionesParameters,
    MainIndividualizacionesState,
} from './types';
import IndividualizacionResultRow from './models/IndividualizacionesResultRow';
import TableIndividualizaciones from './TableIndividualizacion';
import DialogIndividualizaciones from './DialogIndividualizacion';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Individualizacion from '../../../models/Individualizacion';
import { mainIndividualizacionesReducer } from './reducers';
import IndividualizacionesActions from './actions/Individualizacion';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { requestConfirmation } from '../../../sharedComponents/ConfirmationModal';
import { useGlobalNotification } from '../../../sharedHooks/globalMessages';
import { useEnhancedReducer } from '../../../sharedHooks/enhancedReducer';

const initialState: MainIndividualizacionesState = {
    Individualizaciones: {
        searchParameters: {
            idFideicomiso: null,
            idDepto: '',
            calleYNumero: '',
            status: '',
        },
        searchResults: [],
        selectedRow: null,
        currentModel: new Individualizacion(null, null, null, null, null),
        modalMode: OperacionesCatalogo.Alta,
        modalOpen: false,
        isLoadingModel: false,
        savingStatus: SavingStatus.Initial,
        modalErrorMessage: null,
    },
};

const MainIndividualizaciones: React.FC = () => {
    const [state, dispatch, promiseDispatch] = useEnhancedReducer(
        mainIndividualizacionesReducer,
        initialState
    );
    const { alertSuccess, alertError } = useGlobalNotification();

    const closeIndividualizacionesModal = useCallback(() => {
        dispatch({
            type: 'CLOSE_INDIVIDUALIZACIONES_MODAL',
        });
    }, []);

    const saveIndividualizacionesModel = useCallback(
        (model: Individualizacion) => {
            dispatch(IndividualizacionesActions.saveModel(model));
        },
        []
    );

    const searchIndividualizaciones = useCallback(
        (parameters: ITableIndividualizacionesParameters) => {
            dispatch(
                IndividualizacionesActions.newSearchIndividualizaciones(
                    parameters
                )
            );
        },
        []
    );

    const IndividualizacionesActionCallbacks = useMemo(() => {
        return {
            onSelect: (selectedRows: IndividualizacionResultRow[]) => {
                dispatch(
                    IndividualizacionesActions.selectIndividualizacionesRow(
                        selectedRows[0]
                    )
                );
            },
            onNew: () => {
                dispatch({
                    type: 'OPEN_INDIVIDUALIZACIONES_MODAL',
                    mode: OperacionesCatalogo.Alta,
                });
            },
            onView: () => {
                dispatch(
                    IndividualizacionesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Consulta
                    )
                );
            },
            onModify: () => {
                dispatch(
                    IndividualizacionesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Modificacion
                    )
                );
            },
            onDelete: async () => {
                const confirmed = await requestConfirmation();
                if (confirmed) {
                    promiseDispatch(
                        IndividualizacionesActions.deleteSelectedModel()
                    )
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
                value={IndividualizacionesActionCallbacks}
            >
                <TableIndividualizaciones
                    data={state.Individualizaciones.searchResults}
                    onSearch={searchIndividualizaciones}
                />
            </GenericTableCallbacksContext.Provider>
            <DialogIndividualizaciones
                mode={state.Individualizaciones.modalMode}
                open={state.Individualizaciones.modalOpen}
                model={state.Individualizaciones.currentModel}
                isLoading={state.Individualizaciones.isLoadingModel}
                savingStatus={state.Individualizaciones.savingStatus}
                errorMessage={state.Individualizaciones.modalErrorMessage}
                onClose={closeIndividualizacionesModal}
                onSaveRequest={saveIndividualizacionesModel}
            />
        </React.Fragment>
    );
};

export default MainIndividualizaciones;
