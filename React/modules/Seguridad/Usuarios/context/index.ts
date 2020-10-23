import UsuariosResultRow from '../models/UsuariosResultRow';
import Usuario from '../../../../models/Usuarios';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';
import {
    CrudModuleActions,
    ICrudeModuleState,
} from '../../../../sharedComponents/CrudModule/types';

export interface ITableUsuariosParameters {
    idFideicomiso: number | null;
    idDepto: string | '';
    calleYNumero: string | '';
    status: string | '';
}

export type UsuariosState = {
    searchParameters: ITableUsuariosParameters;
    searchResults: UsuariosResultRow[];
    selectedRow: UsuariosResultRow | null;
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
    UsuariosResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};

export type MainUsuariosActions = CrudModuleActions<
    Usuario,
    ITableUsuariosParameters,
    UsuariosResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};
