export type Category = {
    categoryId: number;
    categoryName: string;
};

const CHANGE_CATEGORY = 'category/CHANGE' as const;

export const changeCategory = (item: string) => ({
    type: CHANGE_CATEGORY,
    payload: item
});

type CategoryAction = 
    | ReturnType<typeof changeCategory>;

const initialState: string = '전체';

function category(state:string = initialState, action: CategoryAction): string {
    switch(action.type){
        case CHANGE_CATEGORY:
            state = action.payload;
            return action.payload;
        default:
            return state;
    }
}

export default category;