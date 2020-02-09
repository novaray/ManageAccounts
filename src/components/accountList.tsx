import React, {useState, useEffect} from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {Row} from '../modules/manageAccouts'
import useAccounts from '../hooks/useAccounts';
import useDate from '../hooks/useDate';
import useToggle from '../hooks/useToggle';
import useCaregories from '../hooks/useCategories';
import useChangeAccount from '../hooks/useChangeAccount';
import useCategoryName from '../hooks/useCategoryName';
import EditAccountDlg from './Dialogs/editAccountDlg';
const moment = require('moment');
moment.locale('kr');

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

function spentAmountFormat(amount: number | null) {
    if(amount == null){
        return null;
    }

    let strAmount = amount.toString();
    return `${strAmount.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')}`;
}

function getTotal (items:Row[]) {
    return items.map(({spentAmount}) => spentAmount).reduce((sum, i) => (sum ? sum : 0) + (i ? i : 0), 0);
}

function AccountTable () {
    console.log('다시그리는중')
    const classes = useStyles();
    const rows = useAccounts();
    const AllCategories = useCaregories();
    const isShowAllData = useToggle().isShowAllData;
    const selectedCategory = useCategoryName();
    const selectedDate = useDate().date;
    const { onAdd, onEdit, onRemove } = useChangeAccount();
    const [isEditOpenDlg, setIsEditOpenDlg] = useState(false);
    const [isDeleteOpenDlg, setIsDeleteOpenDlg] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [changeAccountItem, setChangeAccountItem] = useState<Row>({
        accountId: 0,
        category: '',
        spentName: '',
        spentAmount: null,
        date: null
    });
    const [inputAccountItem, setInputAccountItem] = useState<Row>({
        accountId: 0,
        category: '',
        spentName: '',
        spentAmount: 0,
        date: null
    });

    const getFilteredRows = () => {
        if(isShowAllData === true){
            return rows.filter(row => {
                return selectedCategory === '전체' ? true : row.category === selectedCategory
            });
        } else {
            return rows.filter(row => {
                return moment(moment(row.date).format('YYYYMMDD')).isSame(moment(selectedDate).format('YYYYMMDD')) 
                && selectedCategory === '전체' ? true : row.category === selectedCategory
            });
        }
    };

    const categoryList = AllCategories.map(category => 
        category ? (
            <MenuItem value={category.categoryName} key={category.categoryId}>{category.categoryName}</MenuItem>
        ) : null);

    const handleAddSelectChange = (event:React.ChangeEvent<{value: unknown}>) => {
        setInputAccountItem({
            ...inputAccountItem,
            category: event.target.value as string
        });
    };

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
                console.log(changeAccountItem);
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
        if(inputAccountItem.category !== '' && inputAccountItem.spentName !== '' && inputAccountItem.spentAmount != null) {
            onAdd(inputAccountItem);
            setInputAccountItem({
                accountId: 0,
                category: '',
                spentName: '',
                spentAmount: 0,
                date: null
            });
        } else{
            setIsAlertOpen(true);
        }
    }

    const handleClickOpenDeleteDlg = () => {
        setIsDeleteOpenDlg(true);
    }

    const handleClickOpenEditDlg = (item: Row) => {
        setChangeAccountItem(item);
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
                // setChangeAccountItem({
                //     accountId: 0,
                //     category: '', 
                //     spentName: '',
                //     spentAmount: 0,
                //     date: null
                // });
                break;
            case 'alert':
                setIsAlertOpen(false);
                break;
        }
    }

    return (
        <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">삭제</TableCell>
                        <TableCell align="center">수정</TableCell>
                        <TableCell align="center">카테고리</TableCell>
                        <TableCell align="center">지출명</TableCell>
                        <TableCell align="center">지출 금액</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getFilteredRows().map(row => (
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
                                <Button variant="outlined" color="primary" onClick={() => handleClickOpenEditDlg(row)}>
                                    수정
                                </Button>
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
                                <InputLabel id="type-add-select-label">카테고리</InputLabel>
                                <Select
                                    labelId="category-add-select-label"
                                    id="category-add-select-helper"
                                    value={inputAccountItem.category}
                                    onChange={handleAddSelectChange}
                                >
                                    {categoryList}
                                </Select>
                                <FormHelperText>카테고리를 선택하세요.</FormHelperText>
                            </FormControl>
                        </TableCell>
                        <TableCell>
                            <TextField
                                margin="dense"
                                id="addSpentName"
                                label="지출명"
                                type="text"
                                value={inputAccountItem.spentName}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleAddTextFieldChange(e, 'spentName')}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                margin="dense"
                                id="addCategoryName"
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
                    <TableCell align="center">{getTotal(rows)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
            <EditAccountDlg 
                open={isEditOpenDlg} 
                row={changeAccountItem}
                categories={AllCategories}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                handleEditSelectChange={handleEditSelectChange}
                handleEditTextFieldChange={handleEditTextFieldChange}
            />
        </div>
    );
}

export default AccountTable;