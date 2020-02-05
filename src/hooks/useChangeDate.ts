import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {changeDate} from '../modules/manageDate';

export default function useChangeDate() {
    const dispatch = useDispatch();
    return useCallback(date => dispatch(changeDate(date)), [dispatch]);
}