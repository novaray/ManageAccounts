import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {ShowAllData} from '../modules/manageAccouts';
import useChangeDate from '../hooks/useChangeDate';

// interface Props {
//     date: Date | null;
//     handleDateChange: (date : Date | null) => void;
//     isAllDataOfMonth: boolean
// };

export interface Props {
    prop: ShowAllData
};

const DatePicker:React.FC<Props> = ({prop}) => {
    const [date, setDate] = useState<Date | null>(new Date());
    const changeDate = useChangeDate();
    
    const handleDateChange = (date: Date | null) => {
        setDate(date);
        changeDate(date);
    }

    return (    
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/DD"
                margin="normal"
                id="date-picker"
                label="날짜 선택"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date'
                }}
                disabled={prop.isShowAllData}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;