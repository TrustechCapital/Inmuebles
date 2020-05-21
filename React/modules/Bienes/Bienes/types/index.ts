import BienResultRow from '../models/BienResultRow';
import DetalleBienResultRow from '../models/DetalleBienResultRow';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';

export interface ITableBienesParameters {
    idFideicomiso: number | null;
    idSubcuenta: number | null;
    idTipoBien: number | null;
}

export type MainBienesState = {
    bienes: {
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
    detalleBienes: {
        searchResults: DetalleBienResultRow[];
        modalOpen: boolean;
        modalMode: OperacionesCatalogo;
        showActionsToolbar: boolean;
    };
};
