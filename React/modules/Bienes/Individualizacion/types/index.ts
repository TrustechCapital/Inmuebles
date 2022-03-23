import IndividualizacionResultRow from '../models/IndividualizacionesResultRow';
import Individualizacion from '../../../../models/Individualizacion';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';
import {
    CrudModuleActions,
    ICrudeModuleState,
} from '../../../../sharedComponents/CrudModule/types';

export interface ITableIndividualizacionesParameters {
    idFideicomiso: number | null;
    idDepto: string;
    calleYNumero: string;
    status: string;
    numeroCatastro: number | null;
    estado: string;
    municipio: string;
    escriturado: boolean;
    fechaEscritura: Date | null;
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

export type MainIndividualizacionesState = ICrudeModuleState<
    Individualizacion,
    ITableIndividualizacionesParameters,
    IndividualizacionResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};

export type MainIndividualizacionesActions = CrudModuleActions<
    Individualizacion,
    ITableIndividualizacionesParameters,
    IndividualizacionResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};

export type FormatoMoneda = {
    folioReal: number | null | string;
}
