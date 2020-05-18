import { createContext } from 'react';

export type GenericTableCallbacksContextProps<T> = {
    onSearch: (parameters: any) => void;
    onSelect: (selectedRows: T[]) => void;
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
};

export const GenericTableCallbacksContext = createContext<
    GenericTableCallbacksContextProps<any>
>({
    onSearch: () => {},
    onSelect: () => {},
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
});
