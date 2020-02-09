import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {changeCategory} from '../modules/manageCategory';

export default function useChangeCategory() {
    const dispatch = useDispatch();
    return useCallback((item:string) => dispatch(changeCategory(item)), [dispatch]);
}