import FideicomisoResultRow from '../models/FideicomisoResultRow';
import Fideicomiso from '../../../../models/Fideicomiso';
import {
    ICrudeModuleState,
    CrudModuleActions,
} from '../../../../sharedComponents/CrudModule/types';

export interface ITableFideicomisosParameters {
    idFideicomiso: number | null;
    nombreFideicomiso: string | null;
}

export type MainFideicomisosState = ICrudeModuleState<
    Fideicomiso,
    ITableFideicomisosParameters,
    FideicomisoResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};

export type MainFideicomisosActions = CrudModuleActions<
    Fideicomiso,
    ITableFideicomisosParameters,
    FideicomisoResultRow
> & {
    // Aqui se pueden agregar mas propiedades especificas al modelo
};
