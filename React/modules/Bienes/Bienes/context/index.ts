import { createContext } from 'react';
import DetalleBienResultRow from '../models/DetalleBienResultRow';

export type DetalleBienesTableCallbacksContextProps = {
    onSelect: (selectedRows: DetalleBienResultRow[]) => void;
    onNew: () => void;
    onView: () => void;
    onModify: () => void;
    onDelete: () => void;
    onRevaluacion: () => void;
};

export const DetalleBienesTableCallbacksContext = createContext<
    DetalleBienesTableCallbacksContextProps
>({
    onSelect: () => {},
    onNew: () => {},
    onView: () => {},
    onModify: () => {},
    onDelete: () => {},
    onRevaluacion: () => {},
});
