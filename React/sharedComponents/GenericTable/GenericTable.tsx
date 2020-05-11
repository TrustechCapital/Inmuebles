import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { IColumn, ITableRow, SortTypes } from './types';
import GenericTableRow from './GenericTableRow';
import GenericTableToolbar from './GenericTableToolbar';
import GenericTableHead from './GenericTableHead';

const ROW_HEIGHT = 53;

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            width: '100%',
        },
    };
});

function toggleSelectedElementInList(
    selectedElements: Set<object>,
    row: object
): Set<object> {
    if (selectedElements.has(row)) {
        selectedElements.delete(row);
    } else {
        selectedElements.add(row);
    }

    return new Set(selectedElements);
}

function rowsDisplayedFormatter(props: any) {
    const { from, to, count } = props;
    return `${from}-${to === -1 ? count : to} de ${
        count !== -1 ? count : 'más de' + to
    }`;
}

interface TableProps<T> {
    title: string;
    showActionsHeader?: boolean;
    additionalActionsComponent?: any;
    toolbarActionsProps?: any;
    data: T[];
    columns: IColumn[];
    onSelect: (selectedRows: T[]) => void;
    onNew?: () => void;
    onView?: () => void;
}

function GenericTable<T extends ITableRow>(props: TableProps<T>) {
    const {
        title,
        data,
        columns = [],
        onSelect,
        onNew,
        onView,
        toolbarActionsProps = { onNew: onNew, onView: onView },
        showActionsHeader = true,
        additionalActionsComponent = null,
    } = props;

    const keyColumAvailable = columns.find((col) => col.isKey);
    const keyColum: string = keyColumAvailable
        ? keyColumAvailable.field
        : 'key';

    const [order, setOrder] = React.useState<SortTypes>(SortTypes.Asc);
    const [orderBy, setOrderBy] = React.useState(keyColum);
    const [page, setPage] = React.useState(0);
    const [selectedRows, setSelectedRows] = React.useState<Set<object>>(
        new Set()
    );
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const classes = useStyles();
    const isSelected = (row: object) => selectedRows.has(row);

    const currentRows = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    useEffect(() => {
        setSelectedRows(new Set());
    }, [data]);

    function handleClick(row: any) {
        let newSelectedSet = toggleSelectedElementInList(selectedRows, row);
        setSelectedRows(newSelectedSet);
        onSelect(Array.from(newSelectedSet) as T[]);
    }

    const rows = currentRows.map((row) => (
        <GenericTableRow
            key={row.id}
            row={row}
            isSelected={isSelected(row)}
            onClick={handleClick}
            columns={columns}
        />
    ));

    const emptyRowsCount = rowsPerPage - currentRows.length;
    let emptyRowsPlaceholder = null;

    if (emptyRowsCount > 0) {
        emptyRowsPlaceholder = (
            <TableRow style={{ height: ROW_HEIGHT * emptyRowsCount }}>
                <TableCell colSpan={columns.length + 1} />
            </TableRow>
        );
    }

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === SortTypes.Asc;
        setOrder(isAsc ? SortTypes.Asc : SortTypes.Desc);
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked: boolean) => {
        if (checked) {
            setSelectedRows(new Set(currentRows));
            return;
        }
        setSelectedRows(new Set());
    };

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className={classes.root} elevation={3}>
            <GenericTableToolbar
                numSelected={selectedRows.size}
                title={title}
                showActions={showActionsHeader}
                toolbarActionsProps={toolbarActionsProps}
                actionsComponent={additionalActionsComponent}
            />
            <TableContainer className={classes.table}>
                <Table>
                    <GenericTableHead
                        columns={columns}
                        numSelected={selectedRows.size}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {rows}
                        {emptyRowsPlaceholder}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Resultados por página:"
                labelDisplayedRows={rowsDisplayedFormatter}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default GenericTable;
