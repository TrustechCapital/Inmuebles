import IndividualizacionResultRow from '../models/IndividualizacionesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

export interface ITableIndividualizacionesParameters {
    idFideicomiso: number | null;
    idDepto: string | ''; //funi_Id_Depto
    calleYNumero: string | '';
    status: string | '';
}

export type IndividualizacionesState = {
    searchParameters: ITableIndividualizacionesParameters;
    searchResults: IndividualizacionResultRow[];
    selectedRow: IndividualizacionResultRow | null;
    currentModel: Individualizacion;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
};

export type MainIndividualizacionesState = {
    Individualizaciones: IndividualizacionesState;
};

export type IndividualizacionesActions =
    | {
          type: 'SET_INDIVIDUALIZACIONES_SEARCH_PARAMETERS';
          searchParameters: ITableIndividualizacionesParameters;
      }
    | {
          type: 'SET_INDIVIDUALIZACIONES_SEARCH_RESULTS';
          results: IndividualizacionResultRow[];
      }
    | {
          type: 'SET_INDIVIDUALIZACIONES_ROWS_SELECTION';
          selectedRow: IndividualizacionResultRow;
      }
    | {
          type: 'SET_INDIVIDUALIZACIONES_MODEL';
          model: Individualizacion;
      }
    | {
          type: 'OPEN_INDIVIDUALIZACIONES_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_INDIVIDUALIZACIONES_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_INDIVIDUALIZACIONES_MODAL';
      };
export type MainIndividualizacionesActions =
    | IndividualizacionesActions
    | {
          type: 'SELECT_INDIVIDUALIZACIONES_RESULT_ROW';
          selectedRow: IndividualizacionResultRow;
      };
