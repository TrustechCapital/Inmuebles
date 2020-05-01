import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import PropTypes from 'prop-types';

function GenericDatePicker(props){
    const{idSelector,labelSelector,selectedDate,onChange}=props;
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            margin="normal"
            id={idSelector}
            label={labelSelector}
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={onChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            />
        </MuiPickersUtilsProvider>
    );
}
GenericDatePicker.propTypes = {
    idSelector: PropTypes.string.isRequired,
    labelSelector: PropTypes.string.isRequired,
    selectedDate: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
export default GenericDatePicker;