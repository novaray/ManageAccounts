import {useSelector} from 'react-redux';
import {RootState} from '../modules';

export default function useDate() {
    const selectDate = useSelector((state: RootState) => state.selectDate);
    return selectDate;
}