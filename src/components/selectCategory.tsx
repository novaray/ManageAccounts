import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        formControl:{
            margin: theme.spacing(1),
            minWidth: 120
        }  
    })
);

interface Props {
    selectedCategory: string;
    categoires: string[];
    handleSelectChange: (event:React.ChangeEvent<{value: unknown}>) => void;
};

const SelectCategory:React.FC<Props> = ({selectedCategory, categoires, handleSelectChange}) => {
    const classes = useStyles();
    const categoryList = categoires.map(category => 
        category ? (
            <MenuItem value={category}>{category}</MenuItem>
        ) : null);
    
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="type-select-label">카테고리</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select-helper"
                    value={selectedCategory}
                    onChange={handleSelectChange}
                >
                    {categoryList}
                </Select>
                <FormHelperText>카테고리를 선택하세요.</FormHelperText>
            </FormControl>
        </div>
    );
};

export default SelectCategory;