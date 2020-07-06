import PolizaResultRow from '../models/PolizaResultRow';
import Movimientos from '../../../../models/Movimientos';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

export interface ITablePolizaParameters {
    Anio: number | null;
    Mes: number | null;
    Dia: number | null;
}

export type PolizaState = {
    searchParameters: ITablePolizaParameters;
    searchResults: PolizaResultRow[];
    selectedRow: PolizaResultRow | null;
    currentModel: Movimientos;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
};

export type MainPolizaState = {
    Movimientos: PolizaState;
};

export type PolizaActions =
    | {
          type: 'SET_POLIZA_SEARCH_PARAMETERS';
          searchParameters: ITablePolizaParameters;
      }
    | {
          type: 'SET_POLIZA_SEARCH_RESULTS';
          results: PolizaResultRow[];
      }
    | {
          type: 'SET_POLIZA_ROWS_SELECTION';
          selectedRow: PolizaResultRow;
      }
    | {
          type: 'SET_POLIZA_MODEL';
          model: Movimientos;
      }
    | {
          type: 'OPEN_POLIZA_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_POLIZA_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_POLIZA_MODAL';
      }
    | {
          type: 'DOWNLOAD_POLIZA';
          results: PolizaResultRow[];
      };
export type MainPolizaActions =
    | PolizaActions
    | {
          type: 'SELECT_POLIZA_RESULT_ROW';
          selectedRow: PolizaResultRow;
      };
