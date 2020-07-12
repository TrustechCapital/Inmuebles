export type {
    IColumn as IGenericColumn,
    IGenericTableColumn,
    ITableRow as IGenericTableRow,
} from './types';
import GenericTable from './GenericTable';
export { GenericTableCallbacksContext } from './context';
export type { ToolbarActionsProps as GenericToolbarActionsProps } from './GenericTableToolbar';
export default GenericTable;
