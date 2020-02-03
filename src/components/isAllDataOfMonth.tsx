import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {ShowAllData} from '../modules/manageAccouts';
import useShowAllData from '../hooks/useShowAllData';

// interface Props {
//     isAllDataOfMonth: boolean;
//     handleSwitchChange(): void;
// };

export interface Props {
    prop: ShowAllData
};

const AllDataSwitch:React.FC<Props> = ({prop}) => {
    const [isAllDataOfMonth, setIsAllDataOfMonth] = useState(false);
    const showAllData = useShowAllData();

    const handleSwitchChange = () => {
        setIsAllDataOfMonth(!isAllDataOfMonth);
        showAllData(isAllDataOfMonth);
    }

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