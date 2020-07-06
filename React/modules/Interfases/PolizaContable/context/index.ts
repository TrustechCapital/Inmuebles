import { createContext } from 'react';

export type DetallePolizaTableCallbacksContextProps = {
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
    onDelete: () => void;
    onRevaluacion: () => void;
};

export const DetallePolizaTableCallbacksContext = createContext<
    DetallePolizaTableCallbacksContextProps
>({
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
    onDelete: () => {},
    onRevaluacion: () => {},
});
