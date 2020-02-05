import {useSelector} from 'react-redux';
import {RootState} from '../modules';

export default function useCategories() {
    const categoryList = useSelector((state: RootState) => state.categories);
    return categoryList;
}