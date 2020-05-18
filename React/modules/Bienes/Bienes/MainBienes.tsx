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
    searchParameters: {
        idFideicomiso: null,
        idTipoBien: null,
        idSubcuenta: '',
    },
    modalBienesMode: OperacionesCatalogo.Alta,
    bienesList: [],
    selectedBienesRows: [],
    currentBienModel: new Bien(null, null, null),
    modalBienesOpen: false,
    modalDetalleBienesOpen: false,
    modalDetalleBienesMode: OperacionesCatalogo.Alta,
    showActionsDetalleBienesTable: false,
};

const MainBienes: React.FC = () => {
    const [state, dispatch] = useThunkReducer(mainBienesReducer, initialState);

    function handleSelectDetalleBien() {}

    const closeBienesModal = useCallback(() => {
        dispatch({
            type: 'closeBienesModal',
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
                    type: 'selectedBienesRows',
                    selectedRows: selectedRows,
                });
            },
            onNew: () => {
                dispatch({
                    type: 'openBienesModal',
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
                <TableBienes data={state.bienesList} />
            </GenericTableCallbacksContext.Provider>
            <TableDetalleBienes
                data={[]}
                showActionsHeader={state.showActionsDetalleBienesTable}
                onNew={() =>
                    dispatch({
                        type: 'openDetalleBienesModal',
                        mode: OperacionesCatalogo.Alta,
                    })
                }
                onSelect={handleSelectDetalleBien}
            />
            <DialogBienes
                mode={state.modalBienesMode}
                open={state.modalBienesOpen}
                model={state.currentBienModel}
                onClose={closeBienesModal}
                onSaveRequest={saveBienesModel}
            />
            <DialogDetalleBienes
                mode={state.modalDetalleBienesMode}
                opened={state.modalDetalleBienesOpen}
                handleClose={() =>
                    dispatch({
                        type: 'closeDetalleBienesModal',
                    })
                }
            />
        </React.Fragment>
    );
};

export default MainBienes;
