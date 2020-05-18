import BienResultRow from '../models/BienResultRow';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo } from '../../../../constants';

export interface ITableBienesParameters {
    idFideicomiso: number | null;
    idSubcuenta: string;
    idTipoBien: number | null;
}

export type MainBienesState = {
    bienes: {
        searchParameters: ITableBienesParameters;
        searchResults: BienResultRow[];
        selectedRows: BienResultRow[];
        currentModel: Bien;
        modalOpen: boolean;
        modalMode: OperacionesCatalogo;
    };
    detalleBienes: {
        modalOpen: boolean;
        modalMode: OperacionesCatalogo;
        showActionsToolbar: boolean;
    };
};
