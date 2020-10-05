import ReportesResultRow from '../models/ReportesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

export interface ITableReportesParameters {
    idFideicomiso: number | null;
    idTipoBien: number | null;
    numCatastro: number | null;
    status: string | '';
}

export type ReporteState = {
    searchParameters: ITableReportesParameters;
    searchResults: ReportesResultRow[];
    selectedRow: ReportesResultRow | null;
    currentModel: Individualizacion;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
};

export type MainReportesState = {
    Individualizacion: ReporteState;
};

export type ReportesActions =
    | {
          type: 'SET_REPORTES_SEARCH_PARAMETERS';
          searchParameters: ITableReportesParameters;
      }
    | {
          type: 'SET_REPORTES_SEARCH_RESULTS';
          results: ReportesResultRow[];
      }
    | {
          type: 'SET_REPORTES_ROWS_SELECTION';
          selectedRow: ReportesResultRow;
      }
    | {
          type: 'SET_REPORTES_MODEL';
          model: Individualizacion;
      }
    | {
          type: 'OPEN_REPORTES_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_REPORTES_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_REPORTES_MODAL';
      }
    | {
          type: 'DOWNLOAD_REPORTES';
          results: ReportesResultRow[];
      };
export type MainReportesActions =
    | ReportesActions
    | {
          type: 'SELECT_REPORTES_RESULT_ROW';
          selectedRow: ReportesResultRow;
      };
