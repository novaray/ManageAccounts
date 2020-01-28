import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
    date: Date | null;
    handleDateChange: (date : Date | null) => void;
};

const DatePicker:React.FC<Props> = ({date, handleDateChange}) => (
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
        />
    </MuiPickersUtilsProvider>
)

export default DatePicker;

// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme:Theme) => 
//     createStyles({
//         container: {
//             display: 'flex',
//             flexWrap: 'wrap'
//         },
//         textField: {
//             marginLeft: theme.spacing(1),
//             marginRight: theme.spacing(1),
//             width: 200
//         }
//     })
// );

// interface Props {
//     selectedDate: Da
// }

// export default function DatePicker() {
//     const classes = useStyles();

//     return (
//         <form className={classes.container} noValidate>
//             <TextField
//                 id="date"
//                 label="날짜선택"
//                 type="date"
//                 className={classes.textField}
//                 InputLabelProps={{
//                     shrink: true
//                 }}
//             />
//         </form>
//     );
// }