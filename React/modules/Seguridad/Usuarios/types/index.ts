import UsuarioResultRow from '../models/UsuariosResultRow';
import Usuario from '../../../../models/Usuarios';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';
import {
    CrudModuleActions,
    ICrudeModuleState,
} from '../../../../sharedComponents/CrudModule/types';

export interface ITableUsuariosParameters {
    nombreUsuario: string | null;
    idUsuario: string | null;
    idPerfil: number | null;
    status: string | null;
}

export type UsuariosState = {
    searchParameters: ITableUsuariosParameters;
    searchResults: UsuarioResultRow[];
    selectedRow: UsuarioResultRow | null;
    currentModel: Usuario;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
};

export type MainUsuariosState = ICrudeModuleState<
    Usuario,
    ITableUsuariosParameters,
    UsuarioResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};

export type MainUsuariosActions = CrudModuleActions<
    Usuario,
    ITableUsuariosParameters,
    UsuarioResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};
