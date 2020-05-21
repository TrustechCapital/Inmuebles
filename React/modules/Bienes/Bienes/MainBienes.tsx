import React, { useMemo, useCallback } from 'react';
import useThunkReducer from 'react-hook-thunk-reducer';

import { ITableBienesParameters, MainBienesState } from './types';
import BienResultRow from './models/BienResultRow';
import TableBienes from './TableBienes';
import TableDetalleBienes from './TableDetalleBienes';
import DialogBienes from './DialogBienes';
import DialogDetalleBienes from './DialogDetalleBienes';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Bien from '../../../models/Bien';
import {
    mainBienesReducer,
    selectBienesRow,
    fetchAndDisplayModel,
    newSearchBienes,
    saveBienModel,
    deleteSelectedBienModels,
} from './reducers';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';

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
        modalOpen: false,
        modalMode: OperacionesCatalogo.Alta,
        showActionsToolbar: false,
    },
};

const MainBienes: React.FC = () => {
    const [state, dispatch] = useThunkReducer(mainBienesReducer, initialState);

    function handleSelectDetalleBien() {}

    const closeBienesModal = useCallback(() => {
        dispatch({
            type: 'CLOSE_BIENES_MODAL',
        });
    }, []);

    const saveBienesModel = useCallback((model: Bien) => {
        dispatch(saveBienModel(model));
    }, []);

    const searchBienes = useCallback((parameters: ITableBienesParameters) => {
        dispatch(newSearchBienes(parameters));
    }, []);

    const BienesActionCallbacks = useMemo(() => {
        return {
            onSelect: (selectedRows: BienResultRow[]) => {
                dispatch(selectBienesRow(selectedRows[0]));
            },
            onNew: () => {
                dispatch({
                    type: 'OPEN_BIENES_MODAL',
                    mode: OperacionesCatalogo.Alta,
                });
            },
            onView: () => {
                dispatch(fetchAndDisplayModel(OperacionesCatalogo.Consulta));
            },
            onModify: () => {
                dispatch(
                    fetchAndDisplayModel(OperacionesCatalogo.Modificacion)
                );
            },
            onDelete: () => {
                dispatch(deleteSelectedBienModels());
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
            <TableDetalleBienes
                data={state.detalleBienes.searchResults}
                showActionsHeader={state.detalleBienes.showActionsToolbar}
                onNew={() =>
                    dispatch({
                        type: 'OPEN_DETALLE_BIENES_MODAL',
                        mode: OperacionesCatalogo.Alta,
                    })
                }
                onSelect={handleSelectDetalleBien}
            />
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
                opened={state.detalleBienes.modalOpen}
                handleClose={() =>
                    dispatch({
                        type: 'CLOSE_DETALLE_BIENES_MODAL',
                    })
                }
            />
        </React.Fragment>
    );
};

export default MainBienes;
