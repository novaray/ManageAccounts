import React from 'react';
import AccountTable from './components/accountList';
import AddCategoryDialog from './components/addCategory';
import DatePicker from './components/choiceDate';
import AllDataSwitch from './components/isAllDataOfMonth';
import SelectCategory from './components/selectCategory';

function App() {
    return (
        <>
            <AllDataSwitch />
            <DatePicker />
            <div style={{display:'flex'}}>
                <SelectCategory />
                <AddCategoryDialog />
            </div>
            <AccountTable />
        </>
    )
}

export default App;