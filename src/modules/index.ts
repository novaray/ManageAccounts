import { combineReducers } from 'redux';
import accounts from './manageAccouts';
import categories from './manageCategory';
import selectDate from './manageDate';
import toggle from './manageToggle';

const rootReducer = combineReducers({
    accounts,
    categories,
    selectDate,
    toggle
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;