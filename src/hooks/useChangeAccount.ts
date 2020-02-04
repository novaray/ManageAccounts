import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { editAccount, removeAccount, Row } from '../modules/manageAccouts';

export default function useChangeAccount() {
    const dispatch = useDispatch();

    const onAdd = useCallback((item:Row) => dispatch(editAccount(item)), [dispatch]);
    const onEdit = useCallback((item:Row) => dispatch(editAccount(item)), [dispatch]);
    const onRemove = useCallback((id:number) => dispatch(removeAccount(id)), [dispatch]);

    return { onAdd, onEdit, onRemove };
}