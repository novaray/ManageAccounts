import { combineReducers } from 'redux';
import accounts from './manageAccouts';
import categories from './manageCategories';
import selectDate from './manageDate';
import toggle from './manageToggle';
import category from './manageCategory';

const rootReducer = combineReducers({
    accounts,
    categories,
    selectDate,
    toggle,
    category
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;