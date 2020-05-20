import BienResultRow from '../models/BienResultRow';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

export interface ITableBienesParameters {
    idFideicomiso: number | null;
    idSubcuenta: string;
    idTipoBien: number | null;
}

export type MainBienesState = {
    bienes: {
        searchResults: BienResultRow[];
        selectedRows: BienResultRow[];
        currentModel: Bien;
        modalOpen: boolean;
        modalMode: OperacionesCatalogo;
        savingStatus: SavingStatus;
        isLoadingModel: boolean;
        modalErrorMessage: string | null;
    };
    detalleBienes: {
        modalOpen: boolean;
        modalMode: OperacionesCatalogo;
        showActionsToolbar: boolean;
    };
};
