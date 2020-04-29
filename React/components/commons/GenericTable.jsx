import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

function createHeaders(columns){
    return columns.map((col) => <TableCell>{col.header}</TableCell>);
}

function createRow(row, columns, index){
    return (
        <TableRow key={index}>
            {columns.map((col) => {
                return <TableCell>{row[col.field]}</TableCell>
            })}
        </TableRow>
    );
}

export default function GenericTable (props) {
    const {data, columns, onSelect} = props;
    const classes = useStyles();

    const headers = createHeaders(columns);
    const rows = data.map((row, index) => createRow(row, columns, index));

    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    {headers}
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
