import React, { useMemo, useCallback } from 'react';

import { ITableBienesParameters, MainBienesState } from './types';
import BienResultRow from './models/BienResultRow';
import TableBienes from './TableBienes';
import TableDetalleBienes from './TableDetalleBienes';
import DialogBienes from './DialogBienes';
import DialogDetalleBienes from './DialogDetalleBienes';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Bien from '../../../models/Bien';
import { mainBienesReducer } from './reducers';
import bienesActions from './actions/bienes';
import detalleBienesActions from './actions/detalleBienes';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { DetalleBienesTableCallbacksContext } from './context';
import DetalleBienResultRow from './models/DetalleBienResultRow';
import DetalleBien from '../../../models/DetalleBien';
import { OperacionesCatalogoDetalleBienes } from './constants';
import { requestConfirmation } from '../../../sharedComponents/ConfirmationModal';
import { useGlobalNotification } from '../../../sharedHooks/globalMessages';
import { useEnhancedReducer } from '../../../sharedHooks/enhancedReducer';
import { RevaluacionDetalleBien } from './types';

const initialState: MainBienesState = {
    bienes: {
        searchParameters: {
            idFideicomiso: null,
            idSubcuenta: null,
            idTipoBien: null,
        },
        searchResults: [],
        selectedRow: null,
        currentModel: new Bien(null, null, null),
        modalMode: OperacionesCatalogo.Alta,
        modalOpen: false,
        isLoadingModel: false,
        savingStatus: SavingStatus.Initial,
        modalErrorMessage: null,
    },
    detalleBienes: {
        searchResults: [],
        selectedRows: [],
        currentModel: new DetalleBien(null, null, null, null, null),
        modalOpen: false,
        modalMode: OperacionesCatalogoDetalleBienes.Registro,
        showActionsToolbar: false,
        isLoadingModel: false,
        savingStatus: SavingStatus.Initial,
        modalErrorMessage: null,
    },
};

const MainBienes: React.FC = () => {
    const [state, dispatch, promiseDispatch] = useEnhancedReducer(
        mainBienesReducer,
        initialState
    );
    const { alertSuccess, alertError } = useGlobalNotification();

    const handleSelectDetalleBien = useCallback(
        (selectedRows: DetalleBienResultRow[]) => {
            dispatch({
                type: 'SET_DETALLE_BIENES_ROWS_SELECTION',
                selectedRows: selectedRows,
            });
        },
        []
    );

    const closeBienesModal = useCallback(() => {
        dispatch({
            type: 'CLOSE_BIENES_MODAL',
        });
    }, []);

    const saveBienesModel = useCallback((model: Bien) => {
        dispatch(bienesActions.saveModel(model));
    }, []);

    const searchBienes = useCallback((parameters: ITableBienesParameters) => {
        dispatch(bienesActions.newSearchBienes(parameters));
    }, []);

    const closeDetalleBienesModal = useCallback(() => {
        dispatch({
            type: 'CLOSE_DETALLE_BIENES_MODAL',
        });
    }, []);

    const saveDetalleBienesModel = useCallback((model: DetalleBien) => {
        dispatch(detalleBienesActions.saveModel(model));
    }, []);

    const revaluaDetalleBien = useCallback(
        (
            model: DetalleBien,
            revaluacionDetalleBien: RevaluacionDetalleBien
        ) => {
            dispatch(
                detalleBienesActions.saveModel(model, revaluacionDetalleBien)
            );
        },
        []
    );

    const BienesActionCallbacks = useMemo(() => {
        return {
            onSelect: (selectedRows: BienResultRow[]) => {
                dispatch(bienesActions.selectBienesRow(selectedRows[0]));
            },
            onNew: () => {
                dispatch({
                    type: 'OPEN_BIENES_MODAL',
                    mode: OperacionesCatalogo.Alta,
                });
            },
            onView: () => {
                dispatch(
                    bienesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Consulta
                    )
                );
            },
            onModify: () => {
                dispatch(
                    bienesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Modificacion
                    )
                );
            },
            onDelete: async () => {
                const confirmed = await requestConfirmation();
                if (confirmed) {
                    promiseDispatch(bienesActions.deleteSelectedModel())
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

    const DetalleBienesTableConext = useMemo(() => {
        return {
            onNew: () => {
                dispatch(detalleBienesActions.newDetalleBienes());
            },
            onView: () => {
                dispatch(
                    detalleBienesActions.fetchAndDisplayModel(
                        OperacionesCatalogoDetalleBienes.Consulta
                    )
                );
            },
            onModify: () => {
                dispatch(
                    detalleBienesActions.fetchAndDisplayModel(
                        OperacionesCatalogoDetalleBienes.Modificacion
                    )
                );
            },
            onDelete: async () => {
                promiseDispatch(detalleBienesActions.deleteSelectedModels())
                    .then(() => {
                        alertSuccess('Registros eliminados exitosamente');
                    })
                    .catch((e: Error) => {
                        alertError(e.message);
                    });
            },
            onRevaluacion: () => {
                dispatch(
                    detalleBienesActions.fetchAndDisplayModel(
                        OperacionesCatalogoDetalleBienes.Revaluacion
                    )
                );
            },
        };
    }, []);

    return (
        <React.Fragment>
            <GenericTableCallbacksContext.Provider
                value={BienesActionCallbacks}
            >
                <TableBienes
                    data={state.bienes.searchResults}
                    onSearch={searchBienes}
                />
            </GenericTableCallbacksContext.Provider>
            <DetalleBienesTableCallbacksContext.Provider
                value={DetalleBienesTableConext}
            >
                <TableDetalleBienes
                    data={state.detalleBienes.searchResults}
                    showActionsHeader={state.detalleBienes.showActionsToolbar}
                    onSelect={handleSelectDetalleBien}
                />
            </DetalleBienesTableCallbacksContext.Provider>
            <DialogBienes
                mode={state.bienes.modalMode}
                open={state.bienes.modalOpen}
                model={state.bienes.currentModel}
                isLoading={state.bienes.isLoadingModel}
                savingStatus={state.bienes.savingStatus}
                errorMessage={state.bienes.modalErrorMessage}
                onClose={closeBienesModal}
                onSaveRequest={saveBienesModel}
            />
            <DialogDetalleBienes
                mode={state.detalleBienes.modalMode}
                open={state.detalleBienes.modalOpen}
                model={state.detalleBienes.currentModel}
                isLoading={state.detalleBienes.isLoadingModel}
                savingStatus={state.detalleBienes.savingStatus}
                errorMessage={state.detalleBienes.modalErrorMessage}
                onClose={closeDetalleBienesModal}
                onSaveRequest={saveDetalleBienesModel}
                onRevaluacion={revaluaDetalleBien}
            />
        </React.Fragment>
    );
};

export default MainBienes;
