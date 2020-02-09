import React, { useState } from 'react';
import koLocale from 'date-fns/locale/ko';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import useChangeDate from '../hooks/useChangeDate';
import useToggle from '../hooks/useToggle';
const moment = require('moment');
moment.locale('kr');

function DatePicker() {
    const [date, setDate] = useState<Date | null>(moment().format());
    const changeDate = useChangeDate();
    const isShowAllData = useToggle().isShowAllData;
    
    const handleDateChange = (date: Date | null) => {
        setDate(date);
        changeDate(date);
    }

    return (    
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
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