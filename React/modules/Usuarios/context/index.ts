import { createContext } from 'react';

export type UsuariosTableCallbacksContextProps = {
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
    onDelete: () => void;
    onRevaluacion: () => void;
};

export const UsuariosTableCallbacksContext = createContext<
    UsuariosTableCallbacksContextProps
>({
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
    onDelete: () => {},
    onRevaluacion: () => {},
});
