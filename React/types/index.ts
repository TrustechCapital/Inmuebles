import { IModel } from '../models/BaseModel';
import { OperacionesCatalogo } from '../constants';

export type TabsLayout = {
    label: String;
    component: React.ReactType;
};

export interface ICatalogDialog<T extends IModel> {
    mode: OperacionesCatalogo;
    model: T;
    open: boolean;
    onClose: () => void;
    onSaveRequest: (model: T) => void;
}
