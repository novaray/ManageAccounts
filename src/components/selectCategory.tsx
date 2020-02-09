import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useChangeCategory from '../hooks/useChangeCategory';
import useCategories from '../hooks/useCategories';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        formControl:{
            margin: theme.spacing(1),
            minWidth: 120
        }  
    })
);

function SelectCategory () {
    const classes = useStyles();
    let categories = useCategories();
    categories = [{categoryId:-1, categoryName:'전체'}, ...categories];
    const changeCategory = useChangeCategory();
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const categoryList = categories.map(category => 
        category ? (
            <MenuItem value={category.categoryName} key={category.categoryId}>{category.categoryName}</MenuItem>
        ) : null);
    
    const handleSelectChange = (event:React.ChangeEvent<{value: unknown}>) => {
        setSelectedCategory(event.target.value as string);
        changeCategory(event.target.value as string);
    };

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