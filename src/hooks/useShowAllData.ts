import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {toggleSwitch} from '../modules/manageToggle';

export default function useShowAllData() {
    const dispatch = useDispatch();
    return useCallback(isShowAllData => dispatch(toggleSwitch(isShowAllData)), [dispatch]); 
}