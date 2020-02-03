import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {AllCategories, Column, Row} from '../modules/manageAccouts'

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        formControl:{
            margin: theme.spacing(1),
            minWidth: 120
        },
        table: {
            minWidth: 700
        }
    })
);

function spentAmountFormat(amount: number){
    let strAmount = amount.toString();
    return `${strAmount.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')}`;
}

// interface Column {
//     editButtonText: string;
//     deleteButtonText: string;
//     categoryTitle: string;
//     spentNameTitle: string;
//     spentAmountTitle: string;
// };

// interface Row {
//     category: string;
//     spentName: string;
//     spentAmount: number;
// };

// interface EditAccountItemDlgProps {
//     isDeleteDlgOpen: boolean;
//     isEditDlgOpen: boolean;
//     handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>, type:string) => void;
//     handleClickOpen: (type: string) => void;
//     handleClose: (type: string) => void;   
//     handleSubmit: (type: string) => void;
//     categorySelectList: string[];
//     handleSelectChange: (event:React.ChangeEvent<{value: unknown}>) => void;
// }

interface TableProps {
    AllCategories: AllCategories;
    columns: Column;
    rowDatas: Row[];
};

function getTotal (items:Row[]) {
    return items.map(({spentAmount}) => spentAmount).reduce((sum, i) => sum + i, 0);
}

const AccountTable:React.FC<TableProps> = ({AllCategories, columns, rowDatas}) => {
    const classes = useStyles();
    const [isEditOpenDlg, setIsEditOpenDlg] = useState(false);
    const [isDeleteOpenDlg, setIsDeleteOpenDlg] = useState(false);
    const [changeAccountItem, setChangeAccountItem] = useState({
        id: 0,
        category: '',
        spentName: '',
        spentAmount: 0
    });

    const handleSelectChange = (event:React.ChangeEvent<{value: unknown}>) => {
        setChangeAccountItem({
            ...changeAccountItem,
            category: event.target.value as string
        });
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>, type:string) => {
        switch(type){
            case 'spentName':
                setChangeAccountItem({
                    ...changeAccountItem,
                    spentName: event.target.value
                });
                break;
            case 'spentAmount':
                const value = Number(event.target.value);
                setChangeAccountItem({
                    ...changeAccountItem,
                    spentAmount: value
                });
                break;
        }
    }

    const handleClickOpenDeleteDlg = () => {
        setIsDeleteOpenDlg(true);
    }

    const handleClickOpenEditDlg = (item: Row) => {
        setChangeAccountItem({
            id: item.accountId,
            category: item.category, 
            spentName: item.spentName,
            spentAmount: item.spentAmount
        });
        setIsEditOpenDlg(true);
    }

    const handleSubmit = (type:string, row:Row) => {
        switch(type){
            case 'deleteDlg':
                setIsDeleteOpenDlg(false);
                //TODO 추후에 hook 설정.
                break;
            case 'editDlg':
                setIsEditOpenDlg(false);
                //TODO 추후에 hook 설정.
                break;
        }
    }    

    const handleClose = (type:string) => {
        switch(type){
            case 'deleteDlg':
                setIsDeleteOpenDlg(false);
                break;
            case 'editDlg':
                setIsEditOpenDlg(false);
                setChangeAccountItem({
                    id: 0,
                    category: '', 
                    spentName: '',
                    spentAmount: 0
                });
                break;
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{columns.deleteButtonText}</TableCell>
                        <TableCell align="center">{columns.editButtonText}</TableCell>
                        <TableCell align="center">{columns.categoryTitle}</TableCell>
                        <TableCell align="center">{columns.spentNameTitle}</TableCell>
                        <TableCell align="center">{columns.spentAmountTitle}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowDatas.map(row => (
                        <TableRow key={row.spentName}>
                            <TableCell align="center">
                               <Button variant="outlined" color="primary" onClick={handleClickOpenDeleteDlg}>
                                    삭제
                                </Button>
                                <Dialog
                                    open={isDeleteOpenDlg}
                                    onClose={(e) => handleClose('deleteDlg')}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"정말 해당 항목을 삭제하시겠습니까?"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        한 번 삭제된 데이터는 복구가 불가능합니다.
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={(e) => handleClose('deleteDlg')} color="primary">
                                        취소
                                    </Button>
                                    <Button onClick={(e) => handleSubmit('deleteDlg', row)} color="primary">
                                        삭제
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" color="primary" onClick={(e) => handleClickOpenEditDlg(row)}>
                                    수정
                                </Button>
                                <Dialog open={isEditOpenDlg} onClose={(e) => handleClose('editDlg')} aria-labelledby="edit-account-dialog">
                                    <DialogTitle id="dlg-title">지출 항목 수정</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            지출 항목을 수정하세요.
                                        </DialogContentText>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="type-select-label">카테고리</InputLabel>
                                            <Select
                                                labelId="category-select-label"
                                                id="category-select-helper"
                                                value={changeAccountItem.category}
                                                onChange={handleSelectChange}
                                            >
                                                {AllCategories}
                                            </Select>
                                            <FormHelperText>카테고리를 선택하세요.</FormHelperText>
                                        </FormControl>
                                        <TextField
                                            margin="dense"
                                            id="spentName"
                                            label="지출명"
                                            type="text"
                                            value={changeAccountItem.spentName}
                                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleTextFieldChange(e, 'spnetName')}
                                            fullWidth
                                        />
                                        <TextField
                                            margin="dense"
                                            id="categoryName"
                                            label="지출 금액"
                                            type="number"
                                            value={changeAccountItem.spentAmount}
                                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleTextFieldChange(e, 'spentAmount')}
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={(e) => handleClose('editDlg')} color="primary">
                                            취소
                                        </Button>
                                        <Button onClick={(e) => handleSubmit('editDlg', row)} color="primary">
                                            등록
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </TableCell>
                            <TableCell align="center">{row.category}</TableCell>
                            <TableCell align="center">{row.spentName}</TableCell>
                            <TableCell align="center">{spentAmountFormat(row.spentAmount)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={4}>합계</TableCell>
                    <TableCell align="center">{getTotal(rowDatas)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AccountTable;