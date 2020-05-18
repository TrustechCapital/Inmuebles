import BienResultRow from '../models/BienResultRow';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo } from '../../../../constants';

export interface ITableBienesParameters {
    idFideicomiso: number | null;
    idSubcuenta: string;
    idTipoBien: number | null;
}

export type MainBienesState = {
    searchParameters: ITableBienesParameters;
    modalBienesMode: OperacionesCatalogo;
    bienesList: BienResultRow[];
    selectedBienesRows: BienResultRow[];
    currentBienModel: Bien;
    modalBienesOpen: boolean;
    modalDetalleBienesOpen: boolean;
    modalDetalleBienesMode: OperacionesCatalogo;
    showActionsDetalleBienesTable: boolean;
};
