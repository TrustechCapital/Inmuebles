import {
    MainReportesActions,
    MainReportesState,
    ITableReportesParameters,
} from '../types';
import ReportesResultRow from '../models/ReportesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import { reportesApi } from '../services';
import { OperacionesCatalogo } from '../../../../constants';

type MainReportesDispatcher = React.Dispatch<MainReportesActions>;

async function fetchFullModel(
    selectedReportesRow: ReportesResultRow | null
): Promise<Individualizacion | null> {
    if (!selectedReportesRow) {
        return null;
    }

    let reporte = new Individualizacion(
        selectedReportesRow.idFideicomiso,
        null,
        null,
        null,
        null
    );

    return await reportesApi.findByPK(reporte);
}

function selectReportesRow(selectedRow: ReportesResultRow) {
    return async (dispatch: MainReportesDispatcher) => {
        dispatch({
            type: 'SELECT_REPORTES_RESULT_ROW',
            selectedRow: selectedRow,
        });
    };
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: MainReportesDispatcher,
        getState: () => MainReportesState
    ) => {
        const state = getState();
        const loadedModel = await fetchFullModel(
            state.Individualizacion.selectedRow
        );

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_REPORTES_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_REPORTES_MODAL',
            mode: mode,
        });
    };
}

function newSearchReportes(parameters: ITableReportesParameters) {
    return async (dispatch: MainReportesDispatcher) => {
        dispatch({
            type: 'SET_REPORTES_SEARCH_PARAMETERS',
            searchParameters: parameters,
        });

        await searchReportes(dispatch, parameters);
    };
}

async function searchReportes(
    dispatch: MainReportesDispatcher,
    parameters: ITableReportesParameters
) {
    const Reportes = await reportesApi.find(parameters);
    dispatch({
        type: 'SET_REPORTES_SEARCH_RESULTS',
        results: Reportes,
    });
}
async function exportPDF() {
    await reportesApi.findPDF();
}

async function repeatCurrentSearch(
    dispatch: MainReportesDispatcher,
    getState: () => MainReportesState
) {
    const state = getState();
    return await searchReportes(
        dispatch,
        state.Individualizacion.searchParameters
    );
}

function saveModel(model: Individualizacion) {
    return async (
        dispatch: MainReportesDispatcher,
        getState: () => MainReportesState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_REPORTES_MODEL',
        });

        try {
            if (
                state.Individualizacion.modalMode === OperacionesCatalogo.Alta
            ) {
                await reportesApi.create(model);
            } else {
                await reportesApi.update(model);
            }

            dispatch({
                type: 'SET_MODEL_SAVE_SUCCESS',
            });

            repeatCurrentSearch(dispatch, getState);
        } catch (err) {
            dispatch({
                type: 'SET_MODEL_SAVE_ERROR',
                error: err.message,
            });
        }
    };
}

function deleteSelectedModel() {
    return async (
        dispatch: MainReportesDispatcher,
        getState: () => MainReportesState
    ) => {
        const state = getState();

        if (!state.Individualizacion.selectedRow) {
            return;
        }

        const model = reportesApi.getModelFromResultRow(
            state.Individualizacion.selectedRow
        );
        await reportesApi.destroy(model);
        await repeatCurrentSearch(dispatch, getState);
    };
}

export default {
    selectReportesRow,
    fetchAndDisplayModel,
    newSearchReportes,
    exportPDF,
    saveModel,
    deleteSelectedModel,
};
