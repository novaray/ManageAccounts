import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {toggleAllData} from '../modules/manageAccouts';

export default function useShowAllData() {
    const dispatch = useDispatch();
    return useCallback(isShowAllData => dispatch(toggleAllData(isShowAllData)), [dispatch]); 
}