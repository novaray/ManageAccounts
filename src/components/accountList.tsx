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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {AllCategories, Column, Row} from '../modules/manageAccouts'
import useChangeAccount from '../hooks/useChangeAccount';

function Alert(props: AlertProps){
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

function spentAmountFormat(amount: number | null){
    if(amount == null){
        return null;
    }

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
    return items.map(({spentAmount}) => spentAmount).reduce((sum, i) => (sum ? sum : 0) + (i ? i : 0), 0);
}

const AccountTable:React.FC<TableProps> = ({AllCategories, columns, rowDatas}) => {
    const classes = useStyles();
    const { onAdd, onEdit, onRemove } = useChangeAccount();
    const [isEditOpenDlg, setIsEditOpenDlg] = useState(false);
    const [isDeleteOpenDlg, setIsDeleteOpenDlg] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [changeAccountItem, setChangeAccountItem] = useState<Row>({
        accountId: 0,
        category: '',
        spentName: '',
        spentAmount: null
    });
    const [inputAccountItem, setInputAccountItem] = useState<Row>({
        accountId: 0,
        category: '',
        spentName: '',
        spentAmount: null
    });

    const handleEditSelectChange = (event:React.ChangeEvent<{value: unknown}>) => {
        setChangeAccountItem({
            ...changeAccountItem,
            category: event.target.value as string
        });
    };

    const handleEditTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>, type:string) => {
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

    const handleAddSelectChange = (event:React.ChangeEvent<{value: unknown}>) => {
        setInputAccountItem({
            ...inputAccountItem,
            category: event.target.value as string
        });
    };

    const handleAddTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>, type:string) => {
        switch(type){
            case 'spentName':
                setInputAccountItem({
                    ...inputAccountItem,
                    spentName: event.target.value
                });
                break;
            case 'spentAmount':
                const value = Number(event.target.value);
                setInputAccountItem({
                    ...inputAccountItem,
                    spentAmount: value
                });
                break;
        }
    }

    const handleBlur = () => {
        console.log('asdf');

        if(inputAccountItem.category !== '' && inputAccountItem.spentName !== '' && inputAccountItem.spentAmount != null) {
            onAdd(inputAccountItem);
            setInputAccountItem({
                accountId: 0,
                category: '',
                spentName: '',
                spentAmount: null
            });
        } else{
            setIsAlertOpen(true);
        }
    }

    const handleClickOpenDeleteDlg = () => {
        setIsDeleteOpenDlg(true);
    }

    const handleClickOpenEditDlg = (item: Row) => {
        setChangeAccountItem({
            accountId: item.accountId,
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
                onRemove(row.accountId);
                break;
            case 'editDlg':
                setIsEditOpenDlg(false);
                onEdit(row);
                setChangeAccountItem({
                    accountId: 0,
                    category: '',
                    spentName: '',
                    spentAmount: null
                });
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
                    accountId: 0,
                    category: '', 
                    spentName: '',
                    spentAmount: 0
                });
                break;
            case 'alert':
                setIsAlertOpen(false);
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
                                                onChange={handleEditSelectChange}
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
                                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleEditTextFieldChange(e, 'spnetName')}
                                            fullWidth
                                        />
                                        <TextField
                                            margin="dense"
                                            id="categoryName"
                                            label="지출 금액"
                                            type="number"
                                            value={changeAccountItem.spentAmount}
                                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleEditTextFieldChange(e, 'spentAmount')}
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
                        <TableCell colSpan={2} align="center">
                            -
                        </TableCell>
                        <TableCell>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="type-select-label">카테고리</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select-helper"
                                    value={inputAccountItem.category}
                                    onChange={handleAddSelectChange}
                                >
                                    {AllCategories}
                                </Select>
                                <FormHelperText>카테고리를 선택하세요.</FormHelperText>
                            </FormControl>
                        </TableCell>
                        <TableCell>
                            <TextField
                                margin="dense"
                                id="spentName"
                                label="지출명"
                                type="text"
                                value={inputAccountItem.spentName}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleAddTextFieldChange(e, 'spnetName')}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                margin="dense"
                                id="categoryName"
                                label="지출 금액"
                                type="number"
                                value={inputAccountItem.spentAmount}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleAddTextFieldChange(e, 'spentAmount')}
                                onBlur={handleBlur}
                                fullWidth
                            />
                            <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={(e) => handleClose('alert')}>
                                <Alert onClose={(e) => handleClose('alert')} severity="warning">
                                    모든 입력란을 입력해야 추가가 가능합니다.
                                </Alert>
                            </Snackbar>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} align="center">합계</TableCell>
                    <TableCell align="center">{getTotal(rowDatas)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AccountTable;