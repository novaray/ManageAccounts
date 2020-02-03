export type ShowAllData = {
    isShowAllData: boolean
}

export type AllCategories = {
    categories: string[]
}

export type Column = {
    editButtonText: string;
    deleteButtonText: string;
    categoryTitle: string;
    spentNameTitle: string;
    spentAmountTitle: string;
};

export type Row = {
    accountId: number;
    category: string;
    spentName: string;
    spentAmount: number;
};

export interface EditAccountItemDlgProps {
    isDeleteDlgOpen: boolean;
    isEditDlgOpen: boolean;
    handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>, type:string) => void;
    handleClickOpen: (type: string) => void;
    handleClose: (type: string) => void;   
    handleSubmit: (type: string) => void;
    categorySelectList: string[];
    handleSelectChange: (event:React.ChangeEvent<{value: unknown}>) => void;
}

export interface TableProps {
    columns: Column;
    rowDatas: Row[];
    editAccountItemDlgProps: EditAccountItemDlgProps;
};


const ADD_CATEGORY = 'category/ADD' as const;
const REMOVE_CATEGORY = 'category/REMOVE' as const;
const ADD_ACCOUNT = 'account/ADD' as const;
const REMOVE_ACCOUNT = 'account/REMOVE' as const;
const EDIT_ACCOUNT = 'account/EDIT' as const;
const TOGGLE = 'TOGGLE' as const;
const CHANGE_CATEGORY = 'category/CHANGE' as const;
const CHANGE_INPUT = 'account/CHANGE_INPUT' as const;
const CHANGE_DATE = 'date/CHANGE' as const;

export const addCategory = (text:string) => ({
    type: ADD_CATEGORY,
    payload: text
});

export const toggleAllData = (isShowAllData: boolean) => ({
    type: TOGGLE,
    payload: isShowAllData
});

export const changeDate = (date: Date | null) => ({
    type: CHANGE_DATE,
    payload: date
});

export const changeCategory = (text: string) => ({
    type:CHANGE_CATEGORY,
    payload: text
});

export const editAccount = (item: Row) => ({
    type:EDIT_ACCOUNT,
    payload: item
});

export const removeAccount = (item: Row) => ({
    type:REMOVE_ACCOUNT,
    payload: item
});
