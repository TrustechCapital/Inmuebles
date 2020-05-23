import { IModel } from '../models/BaseModel';
import { OperacionesCatalogo, SavingStatus } from '../constants';

export type TabsLayout = {
    label: String;
    component: React.ReactType;
};

export interface ICatalogDialog<T extends IModel> {
    mode: OperacionesCatalogo;
    model: T;
    open: boolean;
    savingStatus: SavingStatus;
    isLoading: boolean;
    errorMessage: string | null;
    onClose: () => void;
    onSaveRequest: (model: T) => void;
}
