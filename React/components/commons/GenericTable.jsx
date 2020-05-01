import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';

const SORT_TYPES = {
    ASC: 'asc',
    DESC: 'desc'
}

const ROW_HEIGHT = 53;

const StyledTableCell = withStyles((theme) => ({
    head: {
      fontWeight: theme.typography.fontWeightBold
    }
}))(TableCell);

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            width: '100%'
        }
    }
});

function toggleSelectedElementInList(selectedElements, id){
    const selectedIndex = selectedElements.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
        newSelected = [...selectedElements, id];
    } else {
        newSelected = newSelected.concat(
            selectedElements.slice(0, selectedIndex),
            selectedElements.slice(selectedIndex + 1),
        );
    }

    return newSelected;
}   

function EnhancedTableHead(props) {
    const { columns, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    function createHeader(column){
        const sortActive = orderBy === column.field;
        return (
            <StyledTableCell
              key={column.field}
              align={column.numeric ? 'right' : 'left'}
              sortDirection={sortActive ? order : false}
            >
              <TableSortLabel
                active={sortActive}
                direction={sortActive ? order : SORT_TYPES.ASC}
                onClick={createSortHandler(column.field)}
              >
                {column.header}
              </TableSortLabel>
            </StyledTableCell>
        )
    }

    const headers = columns.map(createHeader);
  
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </StyledTableCell>
          {headers}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    columns: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf([SORT_TYPES.ASC, SORT_TYPES.ASC]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


function GenericTable (props) {
    const {data, columns, onSelect} = props;
    const keyColum = columns.find((col) => col.isKey).field;
    const [order, setOrder] = React.useState(SORT_TYPES.ASC);
    const [orderBy, setOrderBy] = React.useState(keyColum);
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const classes = useStyles();
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const currentRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    let rows = currentRows.map((row, index) => createRow(row, columns, index));
    const emptyRowsCount = rowsPerPage - currentRows.length;
    let emptyRowsPlaceholder = null;

    if (emptyRowsCount > 0) {
        emptyRowsPlaceholder = (
            <TableRow style={{ height: ROW_HEIGHT * emptyRowsCount }}>
                <TableCell colSpan={columns.length + 1} />
            </TableRow>
        );
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === SORT_TYPES.ASC;
        setOrder(isAsc ? SORT_TYPES.ASC : SORT_TYPES.ASC);
        setOrderBy(property);
      };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((row) => row[keyColum]);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        let newSelected = toggleSelectedElementInList(selected, id);
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function createRow(row, columns, index){
        const keyField = row[keyColum];
        const isItemSelected = isSelected(keyField);
        return (
            <TableRow key={keyField} onClick={(event) => handleClick(event, keyField)}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isItemSelected}
                    />
                </TableCell>
                {columns.map((col) => {
                    return <StyledTableCell align={col.numeric ? 'right' : 'left'}>{row[col.field]}</StyledTableCell>
                })}
            </TableRow>
        );
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.table}>
                <Table>
                    <EnhancedTableHead
                        columns={columns}
                        classes={classes}
                        numSelected={selected.length}
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

GenericTable.propTypes = {
    data: PropTypes.array.isRequired, 
    columns: PropTypes.array.isRequired, 
    onSelect: PropTypes.func.isRequired
};

export default GenericTable;