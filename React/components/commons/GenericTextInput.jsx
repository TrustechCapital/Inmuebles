import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 150,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: '75ch',
    },
}));

function GenericTextInput(props){
    const{label,idCampo,helper,required,defaultVal} = props;
    const classes = useStyles();
    return(
        <FormControl>
            <TextField
            id={idCampo}
            fullWidth
            label={label}
            defaultValue={defaultVal}
            className={classes.textField}
            helperText={helper}
            required={required}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
    );
}
GenericTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    idCampo: PropTypes.string.isRequired,
    helper: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    default: PropTypes.string.isRequired
};

export default GenericTextInput;