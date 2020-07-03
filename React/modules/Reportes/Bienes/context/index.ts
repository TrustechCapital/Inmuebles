import { createContext } from 'react';

export type DetalleReportesTableCallbacksContextProps = {
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
    onDelete: () => void;
    onRevaluacion: () => void;
};

export const DetalleReportesTableCallbacksContext = createContext<
    DetalleReportesTableCallbacksContextProps
>({
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
    onDelete: () => {},
    onRevaluacion: () => {},
});
