import UsuariosResultRow from '../models/UsuariosResultRow';
import Usuarios from '../../../models/Usuarios';
import { OperacionesCatalogo, SavingStatus } from '../../../constants';

export interface ITableUsuariosParameters {
    nombreUsuario: string | null;
    numeroUsuario: number | null;
    perfilCliente: number | null;
    status: string | null;
}

export type UsuariosState = {
    searchParameters: ITableUsuariosParameters;
    searchResults: UsuariosResultRow[];
    selectedRow: UsuariosResultRow | null;
    currentModel: Usuarios;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
};

export type MainUsuariosState = {
    usuarios: UsuariosState;
};

export type UsuariosActions =
    | {
          type: 'SET_USUARIOS_SEARCH_PARAMETERS';
          searchParameters: ITableUsuariosParameters;
      }
    | {
          type: 'SET_USUARIOS_SEARCH_RESULTS';
          results: UsuariosResultRow[];
      }
    | {
          type: 'SET_USUARIOS_ROWS_SELECTION';
          selectedRow: UsuariosResultRow;
      }
    | {
          type: 'SET_USUARIOS_MODEL';
          model: Usuarios;
      }
    | {
          type: 'OPEN_USUARIOS_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_USUARIOS_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_USUARIOS_MODAL';
      };

export type MainUsuariosActions =
    | UsuariosActions
    | {
          type: 'SELECT_USUARIOS_RESULT_ROW';
          selectedRow: UsuariosResultRow;
      };
