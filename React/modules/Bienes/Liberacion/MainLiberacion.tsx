import React, { useMemo, useCallback } from 'react';

import { ITableLiberacionesParameters, MainLiberacionesState } from './types';
import LiberacionResultRow from './models/LiberacionResultRow';
import TableLiberaciones from './TableLiberacion';
import DialogLiberaciones from './DialogLiberacion';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Liberacion from '../../../models/Individualizacion';
import { mainLiberacionesReducer } from './reducers';
import LiberacionesActions from './actions/Liberacion';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { requestConfirmation } from '../../../sharedComponents/ConfirmationModal';
import { useGlobalNotification } from '../../../sharedHooks/globalMessages';
import { useEnhancedReducer } from '../../../sharedHooks/enhancedReducer';

const initialState: MainLiberacionesState = {
    Liberaciones: {
        searchParameters: {
            idFideicomiso: null,
            idDepto: '',
            status: '',
        },
        searchResults: [],
        selectedRow: null,
        currentModel: new Liberacion(null, null, null, null, null),
        modalMode: OperacionesCatalogo.Alta,
        modalOpen: false,
        isLoadingModel: false,
        savingStatus: SavingStatus.Initial,
        modalErrorMessage: null,
    },
};

const MainLiberaciones: React.FC = () => {
    const [state, dispatch, promiseDispatch] = useEnhancedReducer(
        mainLiberacionesReducer,
        initialState
    );
    const { alertSuccess, alertError } = useGlobalNotification();

    const closeLiberacionesModal = useCallback(() => {
        dispatch({
            type: 'CLOSE_LIBERACIONES_MODAL',
        });
    }, []);

    const saveLiberacionesModel = useCallback((model: Liberacion) => {
        dispatch(LiberacionesActions.saveModel(model));
    }, []);

    const searchLiberaciones = useCallback(
        (parameters: ITableLiberacionesParameters) => {
            dispatch(LiberacionesActions.newSearchLiberaciones(parameters));
        },
        []
    );

    const LiberacionesActionCallbacks = useMemo(() => {
        return {
            onSelect: (selectedRows: LiberacionResultRow[]) => {
                dispatch(
                    LiberacionesActions.selectLiberacionesRow(selectedRows[0])
                );
            },
            onNew: () => {
                dispatch({
                    type: 'OPEN_LIBERACIONES_MODAL',
                    mode: OperacionesCatalogo.Alta,
                });
            },
            onView: () => {
                dispatch(
                    LiberacionesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Consulta
                    )
                );
            },
            onModify: () => {
                dispatch(
                    LiberacionesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Modificacion
                    )
                );
            },
            onDelete: async () => {
                const confirmed = await requestConfirmation();
                if (confirmed) {
                    promiseDispatch(LiberacionesActions.deleteSelectedModel())
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
                value={LiberacionesActionCallbacks}
            >
                <TableLiberaciones
                    data={state.Liberaciones.searchResults}
                    onSearch={searchLiberaciones}
                />
            </GenericTableCallbacksContext.Provider>
            <DialogLiberaciones
                mode={state.Liberaciones.modalMode}
                open={state.Liberaciones.modalOpen}
                model={state.Liberaciones.currentModel}
                isLoading={state.Liberaciones.isLoadingModel}
                savingStatus={state.Liberaciones.savingStatus}
                errorMessage={state.Liberaciones.modalErrorMessage}
                onClose={closeLiberacionesModal}
                onSaveRequest={saveLiberacionesModel}
            />
        </React.Fragment>
    );
};

export default MainLiberaciones;
