import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useAddCategory from '../hooks/useAddCategory';

// interface Props {
//     isOpen: boolean;
//     category: string;
//     handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     handleClickOpen: () => void;
//     handleClose: () => void;   
//     handleSubmit: () => void;
// };

const AddCategoryDialog:React.FC = () => {
    const [category, setCateogry] = useState('');
    const [open, setOpen] = useState(false);
    const addCategory = useAddCategory();

    const handleTextFiledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCateogry(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        addCategory(category);
        setCateogry('');
    }

    return (
    <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            카테고리 추가
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">카테고리 추가</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    추가할 카테고리 이름을 입력하세요.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="카테고리 이름"
                    type="text"
                    value={category}
                    onChange={handleTextFiledChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    취소
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    등록
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};

export default AddCategoryDialog;