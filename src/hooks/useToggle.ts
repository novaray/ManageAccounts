import {useSelector} from 'react-redux';
import {RootState} from '../modules';

export default function useToggle() {
    const toggle = useSelector((state: RootState) => state.toggle);
    return toggle;
}