import LiberacionResultRow from '../models/LiberacionResultRow';
import Liberacion from '../../../../models/Individualizacion';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

export interface ITableLiberacionesParameters {
    idFideicomiso: number | null;
    idDepto: string | '';
    status: string | '';
}

export type LiberacionesState = {
    searchParameters: ITableLiberacionesParameters;
    searchResults: LiberacionResultRow[];
    selectedRow: LiberacionResultRow | null;
    currentModel: Liberacion;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
};

export type MainLiberacionesState = {
    Liberaciones: LiberacionesState;
};

export type LiberacionesActions =
    | {
          type: 'SET_LIBERACIONES_SEARCH_PARAMETERS';
          searchParameters: ITableLiberacionesParameters;
      }
    | {
          type: 'SET_LIBERACIONES_SEARCH_RESULTS';
          results: LiberacionResultRow[];
      }
    | {
          type: 'SET_LIBERACIONES_ROWS_SELECTION';
          selectedRow: LiberacionResultRow;
      }
    | {
          type: 'SET_LIBERACIONES_MODEL';
          model: Liberacion;
      }
    | {
          type: 'OPEN_LIBERACIONES_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_LIBERACIONES_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_LIBERACIONES_MODAL';
      };
export type MainLiberacionesActions =
    | LiberacionesActions
    | {
          type: 'SELECT_LIBERACIONES_RESULT_ROW';
          selectedRow: LiberacionResultRow;
      };
