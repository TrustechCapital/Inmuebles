import React, { useMemo, useCallback } from 'react';
import useThunkReducer from 'react-hook-thunk-reducer';

import { ITableBienesParameters, MainBienesState } from './types';
import BienResultRow from './models/BienResultRow';
import TableBienes from './TableBienes';
import TableDetalleBienes from './TableDetalleBienes';
import DialogBienes from './DialogBienes';
import DialogDetalleBienes from './DialogDetalleBienes';
import { OperacionesCatalogo } from '../../../constants';
import Bien from '../../../models/Bien';
import {
    mainBienesReducer,
    fetchAndDisplayModel,
    searchBienes,
    saveBienModel,
} from './reducers';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';

const initialState: MainBienesState = {
    bienes: {
        searchParameters: {
            idFideicomiso: null,
            idTipoBien: null,
            idSubcuenta: '',
        },
        searchResults: [],
        selectedRows: [],
        currentModel: new Bien(null, null, null),
        modalMode: OperacionesCatalogo.Alta,
        modalOpen: false,
    },
    detalleBienes: {
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

    const BienesActionCallbacks = useMemo(() => {
        return {
            onSearch: (parameters: ITableBienesParameters) => {
                dispatch(searchBienes(parameters));
            },
            onSelect: (selectedRows: BienResultRow[]) => {
                dispatch({
                    type: 'SET_BIENES_ROWS_SELECTION',
                    selectedRows: selectedRows,
                });
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
        };
    }, []);

    return (
        <React.Fragment>
            <GenericTableCallbacksContext.Provider
                value={BienesActionCallbacks}
            >
                <TableBienes data={state.bienes.searchResults} />
            </GenericTableCallbacksContext.Provider>
            <TableDetalleBienes
                data={[]}
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
