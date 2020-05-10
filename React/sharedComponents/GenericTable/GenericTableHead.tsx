import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { IColumn, SortTypes } from './types';
import GenericTableCell from './GenericTableCell';

type TableHeadProps = {
    columns: IColumn[];
    numSelected: number;
    onRequestSort: (sortField: string) => void;
    onSelectAllClick: (checked: boolean) => void;
    order: SortTypes;
    orderBy: string;
    rowCount: number;
};

const EnhancedTableHead: React.FC<TableHeadProps> = ({
    columns,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}) => {
    function createHeader(column: IColumn) {
        const sortActive = orderBy === column.field;
        return (
            <GenericTableCell
                key={column.field}
                align={column.numeric ? 'right' : 'left'}
                sortDirection={sortActive ? order : false}
            >
                <TableSortLabel
                    active={sortActive}
                    direction={sortActive ? order : SortTypes.Asc}
                    onClick={(e: any) => {
                        onRequestSort(column.field);
                    }}
                >
                    {column.header}
                </TableSortLabel>
            </GenericTableCell>
        );
    }

    const headers = columns.map(createHeader);

    function handleSelectAll(e: any) {
        onSelectAllClick(e.target.checked);
    }

    return (
        <TableHead>
            <TableRow>
                <GenericTableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={handleSelectAll}
                    />
                </GenericTableCell>
                {headers}
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;
