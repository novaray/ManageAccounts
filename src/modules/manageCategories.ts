import {Category} from './manageCategory';

const CHANGE_CATEGORY = 'category/CHANGE' as const;
const ADD_CATEGORY = 'category/ADD' as const;

export const addCategory = (text:string) => ({
    type: ADD_CATEGORY,
    payload: text
});

export const changeCategory = (item: Category) => ({
    type: CHANGE_CATEGORY,
    payload: item
});

type CategoryAction = 
    | ReturnType<typeof addCategory>
    | ReturnType<typeof changeCategory>;

type CategoryList = Category[];

const initialState: CategoryList = [
    { categoryId: 1, categoryName: '주유비' },
    { categoryId: 2, categoryName: '식비' },
    { categoryId: 3, categoryName: '교육비' }
  ];

function categories(state:CategoryList = initialState, action: CategoryAction): CategoryList {
    switch(action.type){
        case ADD_CATEGORY:
            const nextId = Math.max(...state.map(category => category.categoryId)) + 1;
            return [...state, {
                categoryId: nextId,
                categoryName: action.payload
            }];
        default:
            return state;
    }
}

export default categories;