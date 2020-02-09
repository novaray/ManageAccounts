import React, {useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Row} from '../../modules/manageAccouts';
import {Category} from '../../modules/manageCategory';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        formControl:{
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
);

type DialogProps = {
    open: boolean;
    row: Row;
    categories: Category[];
    handleClose: (type:string) => void;
    handleSubmit: (type:string, item: Row) => void;
    handleEditTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>, type:string) => void;
    handleEditSelectChange: (event:React.ChangeEvent<{value: unknown}>) => void;
}

export default function EditAccountDlg (props: DialogProps) {
    const classes = useStyles();
    const {open, row, categories ,handleClose, handleSubmit, handleEditTextFieldChange, handleEditSelectChange} = props;
    const [changeAccountItem, setChangeAccountItem] = useState<Row>({
        accountId: 0,
        category: '',
        spentName: '',
        spentAmount: null,
        date: null
    });

    useEffect(() => {
        setChangeAccountItem(row);
    });

    const categoryList = categories.map(category => 
        category ? (
            <MenuItem value={category.categoryName} key={category.categoryId}>{category.categoryName}</MenuItem>
        ) : null);

    return (
        <Dialog open={open} onClose={() => handleClose('editDlg')} aria-labelledby="edit-account-dialog">
        <DialogTitle id="dlg-title">지출 항목 수정</DialogTitle>
        <DialogContent>
            <DialogContentText>
                지출 항목을 수정하세요.
            </DialogContentText>
            <FormControl className={classes.formControl}>
                <InputLabel id="type-edit-select-label">카테고리</InputLabel>
                <Select
                    labelId="category-edit-select-label"
                    id="category-edit-select-helper"
                    value={changeAccountItem.category}
                    onChange={handleEditSelectChange}
                >
                    {categoryList}
                </Select>
                <FormHelperText>카테고리를 선택하세요.</FormHelperText>
            </FormControl>
            <TextField
                margin="dense"
                id="editSpentName"
                label="지출명"
                type="text"
                value={changeAccountItem.spentName}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleEditTextFieldChange(e, 'spentName')}
                fullWidth
            />
            <TextField
                margin="dense"
                id="editCategoryName"
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
            <Button onClick={(e) => handleSubmit('editDlg', changeAccountItem)} color="primary">
                등록
            </Button>
        </DialogActions>
        </Dialog>
    );
}