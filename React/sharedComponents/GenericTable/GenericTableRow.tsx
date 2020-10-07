import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import GenericTableCell from './GenericTableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

import { IColumn } from './types';
import { formatMoney } from '../../utils/NumberUtils';

type TableRowProps = {
    key: string,
    row: any;
    columns: IColumn[];
    isSelected: boolean;
    onClick: (row: any) => void;
    useCheckbox: boolean;
};

const GenericTableRow: React.FC<TableRowProps> = React.memo(
    ({ key, row, columns, isSelected, onClick, useCheckbox }) => {
        return (
            <TableRow 
            key={key} onClick={(e: any) => onClick(row)}>
                <TableCell padding="checkbox">
                    {useCheckbox ? (
                        <Checkbox checked={isSelected} />
                    ) : (
                        <Radio checked={isSelected} />
                    )}
                </TableCell>
                {columns.map((col) => {
                    const cellValue = col.numeric ? formatMoney(row[col.field]) : row[col.field];
                    return (
                        <GenericTableCell
                            align={col.numeric ? 'right' : 'left'}
                        >
                            {cellValue}
                        </GenericTableCell>
                    );
                })}
            </TableRow>
        );
    }
);

export default GenericTableRow;
