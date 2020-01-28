import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    isOpen: boolean;
    category: string;
    handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickOpen: () => void;
    handleClose: () => void;   
    handleSubmit: () => void;
};

const AddCategoryDialog:React.FC<Props> = ({isOpen, category, handleTextFieldChange, handleClickOpen, handleClose, handleSubmit}) => (
    <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            카테고리 추가
        </Button>
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                    onChange={handleTextFieldChange}
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

export default AddCategoryDialog;