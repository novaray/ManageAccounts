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
    table: {
        minWidth: 700
    }
});

function spentAmountFormat(amount: number){
    let strAmount = amount.toString();
    return `${strAmount.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')}`;
}

interface Column {
    categoryTitle: string;
    spentNameTitle: string;
    spentAmountTitle: string;
};

interface Row {
    category: string;
    spentName: string;
    spentAmount: number;
};

interface TableProps {
    columns: Column;
    rowDatas: Row[];
};

function getTotal (items:Row[]) {
    return items.map(({spentAmount}) => spentAmount).reduce((sum, i) => sum + i, 0);
}

const AccountTable:React.FC<TableProps> = ({columns, rowDatas}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{columns.categoryTitle}</TableCell>
                        <TableCell align="center">{columns.spentNameTitle}</TableCell>
                        <TableCell align="center">{columns.spentAmountTitle}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowDatas.map(row => (
                        <TableRow key={row.spentName}>
                            <TableCell align="center">{row.category}</TableCell>
                            <TableCell align="center">{row.spentName}</TableCell>
                            <TableCell align="center">{row.spentAmount}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={2}>합계</TableCell>
                    <TableCell align="center">{getTotal(rowDatas)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}