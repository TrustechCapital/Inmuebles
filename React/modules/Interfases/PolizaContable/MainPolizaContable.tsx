import React, { useMemo, useCallback } from 'react';

import { ITablePolizaParameters, MainPolizaState } from './types';
import PolizaResultRow from './models/PolizaResultRow';
import TablePoliza from './TablePolizaContable';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Movimientos from '../../../models/Movimientos';
import { mainPolizaReducer } from './reducers';
import PolizaActions from './actions/poliza';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { requestConfirmation } from '../../../sharedComponents/ConfirmationModal';
import { useGlobalNotification } from '../../../sharedHooks/globalMessages';
import { useEnhancedReducer } from '../../../sharedHooks/enhancedReducer';

const initialState: MainPolizaState = {
    Movimientos: {
        searchParameters: {
            Anio: null,
            Mes: null,
            Dia: null,
        },
        searchResults: [],
        selectedRow: null,
        currentModel: new Movimientos(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ),
        modalMode: OperacionesCatalogo.Alta,
        modalOpen: false,
        isLoadingModel: false,
        savingStatus: SavingStatus.Initial,
        modalErrorMessage: null,
    },
};

const MainMovimientos: React.FC = () => {
    const [state, dispatch, promiseDispatch] = useEnhancedReducer(
        mainPolizaReducer,
        initialState
    );
    const { alertSuccess, alertError } = useGlobalNotification();

    const searchPoliza = useCallback((parameters: ITablePolizaParameters) => {
        dispatch(PolizaActions.newSearchPoliza(parameters));
    }, []);

    const PolizaActionCallbacks = useMemo(() => {
        return {
            onSelect: (selectedRows: PolizaResultRow[]) => {
                dispatch(PolizaActions.selectPolizaRow(selectedRows[0]));
            },
            onNew: () => {
                dispatch({
                    type: 'OPEN_POLIZA_MODAL',
                    mode: OperacionesCatalogo.Alta,
                });
            },
            onView: () => {
                dispatch(
                    PolizaActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Consulta
                    )
                );
            },
            onModify: () => {
                dispatch(
                    PolizaActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Modificacion
                    )
                );
            },
            onDelete: async () => {
                const confirmed = await requestConfirmation();
                if (confirmed) {
                    promiseDispatch(PolizaActions.deleteSelectedModel())
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
                value={PolizaActionCallbacks}
            >
                <TablePoliza
                    data={state.Movimientos.searchResults}
                    onSearch={searchPoliza}
                />
            </GenericTableCallbacksContext.Provider>
        </React.Fragment>
    );
};

export default MainMovimientos;
