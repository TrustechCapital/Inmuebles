import {
    MainReportesState,
    MainReportesActions,
    ReportesActions,
} from '../types';

import { ReportesReducer } from './reportes';

function mainReportesReducer(
    state: MainReportesState,
    action: MainReportesActions
): MainReportesState {
    switch (action.type) {
        case 'SET_REPORTES_SEARCH_RESULTS':
            return {
                Individualizacion: ReportesReducer(
                    state.Individualizacion,
                    action
                ),
            };
        case 'SELECT_REPORTES_RESULT_ROW':
            return {
                Individualizacion: ReportesReducer(state.Individualizacion, {
                    ...action,
                    type: 'SET_REPORTES_ROWS_SELECTION',
                }),
            };
        default:
            return {
                Individualizacion: ReportesReducer(
                    state.Individualizacion,
                    action as ReportesActions
                ),
            };
    }
}

export { mainReportesReducer };
