export type toggle = {
    isShowAllData: boolean
};

const TOGGLE = 'TOGGLE' as const;

export const toggleSwitch = (isShowAllData: boolean) => ({
    type: TOGGLE,
    payload: isShowAllData
});

type ToggleAction = 
    | ReturnType<typeof toggleSwitch>;

const initialState: toggle = {
    isShowAllData: false
};

function toggle(state: toggle = initialState, action: ToggleAction): toggle {
    switch(action.type){
        case TOGGLE:
            state.isShowAllData = action.payload;
            return Object.assign({}, state, {isShowAllData: action.payload});
        default:
            return state;
    }
};

export default toggle;