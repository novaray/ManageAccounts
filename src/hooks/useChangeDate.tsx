import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {changeDate} from '../modules/manageAccouts';

export default function useChangeDate() {
    const dispatch = useDispatch();
    return useCallback(date => dispatch(changeDate(date)), [dispatch]);
}