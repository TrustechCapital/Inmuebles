import React, { useMemo, useCallback } from 'react';

import { ITableReportesParameters, MainReportesState } from './types';
import ReportesResultRow from './models/ReportesResultRow';
import TableReporte from './TableReporteBienes';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';
import Individualizacion from '../../../models/Individualizacion';
import { mainReportesReducer } from './reducers';
import ReportesActions from './actions/reporte';

import { GenericTableCallbacksContext } from '../../../sharedComponents/GenericTable';
import { requestConfirmation } from '../../../sharedComponents/ConfirmationModal';
import { useGlobalNotification } from '../../../sharedHooks/globalMessages';
import { useEnhancedReducer } from '../../../sharedHooks/enhancedReducer';

const initialState: MainReportesState = {
    Individualizacion: {
        searchParameters: {
            idFideicomiso: null,
            cveGarantia: '',
            numCatastro: null,
            tipoInmueble: '',
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

const MainIndividualizacion: React.FC = () => {
    const [state, dispatch, promiseDispatch] = useEnhancedReducer(
        mainReportesReducer,
        initialState
    );
    const { alertSuccess, alertError } = useGlobalNotification();

    const searchReportes = useCallback(
        (parameters: ITableReportesParameters) => {
            dispatch(ReportesActions.newSearchReportes(parameters));
        },
        []
    );
    const exportReportes = useCallback(() => {
        ReportesActions.exportPDF();
    }, []);

    const ReportesActionCallbacks = useMemo(() => {
        return {
            onSelect: (selectedRows: ReportesResultRow[]) => {
                dispatch(ReportesActions.selectReportesRow(selectedRows[0]));
            },
            onNew: () => {
                dispatch({
                    type: 'OPEN_REPORTES_MODAL',
                    mode: OperacionesCatalogo.Alta,
                });
            },
            onView: () => {
                dispatch(
                    ReportesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Consulta
                    )
                );
            },
            onModify: () => {
                dispatch(
                    ReportesActions.fetchAndDisplayModel(
                        OperacionesCatalogo.Modificacion
                    )
                );
            },
            onDelete: async () => {
                const confirmed = await requestConfirmation();
                if (confirmed) {
                    promiseDispatch(ReportesActions.deleteSelectedModel())
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
                value={ReportesActionCallbacks}
            >
                <TableReporte
                    data={state.Individualizacion.searchResults}
                    onSearch={searchReportes}
                    onPDF={exportReportes}
                />
            </GenericTableCallbacksContext.Provider>
        </React.Fragment>
    );
};

export default MainIndividualizacion;
