import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {addCategory} from '../modules/manageCategory';

export default function useAddCategory() {
    const dispatch = useDispatch();
    return useCallback(text => dispatch(addCategory(text)), [dispatch]);
}