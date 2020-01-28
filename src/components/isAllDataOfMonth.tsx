import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
    isAllDataOfMonth: boolean;
    handleSwitchChange(): void;
};

const AllDataSwitch:React.FC<Props> = ({isAllDataOfMonth, handleSwitchChange}) => (
    <FormControlLabel
        control={
            <Switch checked={isAllDataOfMonth} onChange={handleSwitchChange} />
        }
        label="이번 달 가계부 전체 표시"
    />
);

export default AllDataSwitch;