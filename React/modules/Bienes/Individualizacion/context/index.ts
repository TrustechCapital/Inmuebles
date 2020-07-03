import { createContext } from 'react';

export type DetalleIndividualizacionesTableCallbacksContextProps = {
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
    onDelete: () => void;
    onRevaluacion: () => void;
};

export const DetalleIndividualizacionesTableCallbacksContext = createContext<
    DetalleIndividualizacionesTableCallbacksContextProps
>({
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
    onDelete: () => {},
    onRevaluacion: () => {},
});
