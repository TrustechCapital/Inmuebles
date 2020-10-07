import ResultRowModel from "../../models/ResultRowModel";

export type IColumn = IGenericTableColumn<any>;

export interface IGenericTableColumn<T extends ResultRowModel> {
    field: Extract<keyof T, string>;
    header: string;
    isKey?: boolean;
    numeric?: boolean;
}

export enum SortTypes {
    Asc = 'asc',
    Desc = 'desc',
}
