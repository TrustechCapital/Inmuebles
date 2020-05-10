import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import GenericTableCell from './GenericTableCell';
import Checkbox from '@material-ui/core/Checkbox';

import { IColumn } from './types';

type TableRowProps = {
    row: any;
    columns: IColumn[];
    isSelected: boolean;
    onClick: (row: any) => void;
};

const GenericTableRow: React.FC<TableRowProps> = React.memo(
    ({ row, columns, isSelected, onClick }) => {
        return (
            <TableRow onClick={(e: any) => onClick(row)}>
                <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                </TableCell>
                {columns.map((col) => {
                    return (
                        <GenericTableCell
                            key={col.field}
                            align={col.numeric ? 'right' : 'left'}
                        >
                            {row[col.field]}
                        </GenericTableCell>
                    );
                })}
            </TableRow>
        );
    }
);

export default GenericTableRow;
