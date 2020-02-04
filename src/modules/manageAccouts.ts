import path from 'path';
const dbPath = path.join(document.location.hostname, 'db', 'accounts.db');
const DataStore= require('nedb');
let db = new DataStore({fileName: dbPath});
db.loadDatabase();

export type ShowAllData = {
    isShowAllData: boolean
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
    spentAmount: number | null;
};

// export interface EditAccountItemDlgProps {
//     isDeleteDlgOpen: boolean;
//     isEditDlgOpen: boolean;
//     handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>, type:string) => void;
//     handleClickOpen: (type: string) => void;
//     handleClose: (type: string) => void;   
//     handleSubmit: (type: string) => void;
//     categorySelectList: string[];
//     handleSelectChange: (event:React.ChangeEvent<{value: unknown}>) => void;
// }

// export interface TableProps {
//     columns: Column;
//     rowDatas: Row[];
//     editAccountItemDlgProps: EditAccountItemDlgProps;
// };

const REMOVE_CATEGORY = 'category/REMOVE' as const;
const ADD_ACCOUNT = 'account/ADD' as const;
const REMOVE_ACCOUNT = 'account/REMOVE' as const;
const EDIT_ACCOUNT = 'account/EDIT' as const;
const TOGGLE = 'TOGGLE' as const;
const CHANGE_DATE = 'date/CHANGE' as const;

export const toggleAllData = (isShowAllData: boolean) => ({
    type: TOGGLE,
    payload: isShowAllData
});

export const changeDate = (date: Date | null) => ({
    type: CHANGE_DATE,
    payload: date
});

export const addAccount = (item: Row) => ({
    type: ADD_ACCOUNT,
    payload: item
});

export const editAccount = (item: Row) => ({
    type: EDIT_ACCOUNT,
    payload: item
});

export const removeAccount = (id: number) => ({
    type: REMOVE_ACCOUNT,
    payload: id
});

type AccountAction = 
    | ReturnType<typeof toggleAllData>
    | ReturnType<typeof changeDate>
    | ReturnType<typeof addAccount>
    | ReturnType<typeof editAccount>
    | ReturnType<typeof removeAccount>;

type AccountList = Row[];
type IsShowAllData = ShowAllData;

db.find({}, function (err:any, docs:any) {
    console.log(docs);
});

const initialState: AccountList = [
    { accountId: 1, category: '주유비',spentName: '싸게', spentAmount:3000 },
    { accountId: 2, category: '주유비',spentName: '가득', spentAmount:50000 },
    { accountId: 3, category: '주유비',spentName: '중간', spentAmount:25000 }
  ];

function accounts(state:AccountList= initialState, action:AccountAction): AccountList {
    switch(action.type){
        case ADD_ACCOUNT:
            const nextId = Math.max(...state.map(account => account.accountId)) + 1;
            return [...state, {
                accountId: nextId,
                category: action.payload.category,
                spentName: action.payload.spentName,
                spentAmount: action.payload.spentAmount
              }];
        case EDIT_ACCOUNT:
            return state.map(account => 
                    account.accountId === action.payload.accountId ? {
                        ...account,
                        category: action.payload.category,
                        spentName: action.payload.spentName,
                        spentAmount: action.payload.spentAmount
                    } : account
                );
        case REMOVE_ACCOUNT:
            return state.filter(account => account.accountId !== action.payload);
        default:
            return state;
    }
}

export default accounts;