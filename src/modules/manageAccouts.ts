import path from 'path';
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';
const dbPath = path.join(document.location.hostname, 'db', 'accounts.db');
const DataStore= require('nedb');
let db = new DataStore({fileName: dbPath});
db.loadDatabase();

export type Row = {
    accountId: number;
    category: string;
    spentName: string;
    spentAmount: number | null;
    date: Date | null;
};

const REMOVE_CATEGORY = 'category/REMOVE' as const;
const ADD_ACCOUNT = 'account/ADD' as const;
const REMOVE_ACCOUNT = 'account/REMOVE' as const;
const EDIT_ACCOUNT = 'account/EDIT' as const;

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
    | ReturnType<typeof addAccount>
    | ReturnType<typeof editAccount>
    | ReturnType<typeof removeAccount>;

type AccountList = Row[];

db.find({}, function (err:any, docs:any) {
    console.log(docs);
});

const initialState: AccountList = [
    { accountId: 1, category: '주유비',spentName: '싸게', spentAmount:3000, date: new Date() },
    { accountId: 2, category: '주유비',spentName: '가득', spentAmount:50000, date: new Date() },
    { accountId: 3, category: '주유비',spentName: '중간', spentAmount:25000, date: new Date() }
  ];

function accounts(state:AccountList= initialState, action:AccountAction): AccountList {
    switch(action.type){
        case ADD_ACCOUNT:
            const nextId = Math.max(...state.map(account => account.accountId)) + 1;
            return [...state, {
                accountId: nextId,
                category: action.payload.category,
                spentName: action.payload.spentName,
                spentAmount: action.payload.spentAmount,
                date: new Date()
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
};

export default accounts;