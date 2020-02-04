import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {changeCategory} from '../modules/manageAccouts';

export default function useChangeCategory() {
    const dispatch = useDispatch();
    return useCallback(text => dispatch(changeCategory(text)), [dispatch]);
}