import {useSelector} from 'react-redux';
import {RootState} from '../modules';

export default function useCategoryName() {
    const selectCategory = useSelector((state: RootState) => state.category);
    return selectCategory;
}