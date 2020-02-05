export type SelectedDate = {
    date: Date | null;
};

const CHANGE_DATE = 'date/CHANGE' as const;

export const changeDate = (date: Date | null) => ({
    type: CHANGE_DATE,
    payload: date
});

type DateAction = 
    | ReturnType<typeof changeDate>;

const initialState:SelectedDate = {
    date:new Date()
};

function selectDate(state:SelectedDate = initialState, action: DateAction): SelectedDate{
    switch(action.type) {
        case CHANGE_DATE:
            state.date = action.payload;
            return state;
        default:
            return state;
    }
};

export default selectDate;