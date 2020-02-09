import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useShowAllData from '../hooks/useShowAllData';

function AllDataSwitch () {
    const [isAllDataOfMonth, setIsAllDataOfMonth] = useState(false);
    const showAllData = useShowAllData();

    const handleSwitchChange = () => {
        setIsAllDataOfMonth(!isAllDataOfMonth);
        showAllData(!isAllDataOfMonth);
    };

    return (
        <FormControlLabel
            control={
                <Switch checked={isAllDataOfMonth} onChange={handleSwitchChange} />
            }
            label="이번 달 가계부 전체 표시"
        />
    );
};

export default AllDataSwitch;