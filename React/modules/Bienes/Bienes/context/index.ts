import { createContext } from 'react';

export type DetalleBienesTableCallbacksContextProps = {
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
    onDelete: () => void;
    onRevaluacion: () => void;
};

export const DetalleBienesTableCallbacksContext = createContext<
    DetalleBienesTableCallbacksContextProps
>({
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
    onDelete: () => {},
    onRevaluacion: () => {},
});
