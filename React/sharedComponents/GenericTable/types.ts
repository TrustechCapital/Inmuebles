export interface IColumn {
    field: string;
    header: string;
    isKey?: boolean;
    numeric?: boolean;
}

export interface ITableRow {
    id: number;
}

export enum SortTypes {
    Asc = 'asc',
    Desc = 'desc',
}
