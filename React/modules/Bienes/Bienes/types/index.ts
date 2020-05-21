import BienResultRow from '../models/BienResultRow';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import Bien from '../../../../models/Bien';
import DetalleBien from '../../../../models/DetalleBien';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

export interface ITableBienesParameters {
    idFideicomiso: number | null;
    idSubcuenta: number | null;
    idTipoBien: number | null;
}

export type BienesState = {
    searchParameters: ITableBienesParameters;
    searchResults: BienResultRow[];
    selectedRow: BienResultRow | null;
    currentModel: Bien;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
};

export type DetalleBienesState = {
    searchResults: DetalleBienResultRow[];
    selectedRows: DetalleBienResultRow[];
    currentModel: DetalleBien;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    showActionsToolbar: boolean;
};

export type MainBienesState = {
    bienes: BienesState;
    detalleBienes: DetalleBienesState;
};

export type BienesActions =
    | {
          type: 'SET_BIENES_SEARCH_PARAMETERS';
          searchParameters: ITableBienesParameters;
      }
    | {
          type: 'SET_BIENES_SEARCH_RESULTS';
          results: BienResultRow[];
      }
    | {
          type: 'SET_BIENES_ROWS_SELECTION';
          selectedRow: BienResultRow;
      }
    | {
          type: 'SET_BIEN_MODEL';
          model: Bien;
      }
    | {
          type: 'OPEN_BIENES_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_BIEN_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_BIENES_MODAL';
      };

export type DetalleBienesActions =
    | {
          type: 'SET_DETALLE_BIENES_ROWS_SELECTION';
          selectedRows: DetalleBienResultRow[];
      }
    | {
          type: 'SET_DETALLE_BIEN_MODEL';
          model: DetalleBien;
      }
    | {
          type: 'OPEN_DETALLE_BIENES_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'CLOSE_DETALLE_BIENES_MODAL';
      };

export type MainBienesActions =
    | BienesActions
    | DetalleBienesActions
    | {
          type: 'SELECT_BIENES_RESULT_ROW';
          detalleBienesSearchResults: DetalleBienResultRow[];
          selectedRow: BienResultRow;
      };
