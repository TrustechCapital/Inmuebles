import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2),
    }
  }));

function GenericDatePicker(props){
    const{idSelector,labelSelector,selectedDate,onChange}=props;
    const classes = useStyles();

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
            <KeyboardDatePicker
            margin="normal"
            id={idSelector}
            label={labelSelector}
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={onChange}
            fullWidth
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