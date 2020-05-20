import { createContext } from 'react';

export type GenericTableCallbacksContextProps<T> = {
    onSelect: (selectedRows: T[]) => void;
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
};

export const GenericTableCallbacksContext = createContext<
    GenericTableCallbacksContextProps<any>
>({
    onSelect: () => {},
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
});
