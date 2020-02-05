import {useSelector} from 'react-redux';
import {RootState} from '../modules';

export default function useAccounts() {
    const accounts = useSelector((state: RootState) => state.accounts);
    return accounts;
}