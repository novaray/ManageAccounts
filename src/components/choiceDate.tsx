import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import useChangeDate from '../hooks/useChangeDate';
import useToggle from '../hooks/useToggle';

function DatePicker() {
    const [date, setDate] = useState<Date | null>(new Date('2020-02-05T21:11:54'));
    const changeDate = useChangeDate();
    const isShowAllData = useToggle().isShowAllData;
    
    const handleDateChange = (date: Date | null) => {
        setDate(date);
        changeDate(date);
    }

    return (    
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker"
                label="날짜 선택"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date'
                }}
                disabled={isShowAllData}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;