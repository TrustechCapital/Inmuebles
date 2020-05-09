import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    },
    formControl: {
        marginTop: theme.spacing(2),
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
    },
}));

type Props = {
    label: string;
    idCampo?: string;
    helper?: string;
    required?: boolean;
    value: string | number | null;
    adornment?: string;
    readOnly?: boolean;
    onChange: (value: string | number | null) => void;
    dataType?: 'text' | 'number';
};

const GenericTextInput: FunctionComponent<Props> = ({
    label,
    idCampo,
    helper,
    required = false,
    value,
    adornment,
    readOnly = false,
    onChange,
    dataType = 'text',
}) => {
    const classes = useStyles();

    const inputProps = {
        readOnly: readOnly,
        startAdornment: adornment ? (
            <InputAdornment position="start">{adornment}</InputAdornment>
        ) : null,
    };

    function handleChange(e: any) {
        onChange(e.target.value);
    }

    return (
        <FormControl fullWidth>
            <TextField
                id={idCampo}
                fullWidth
                label={label}
                value={value == null ? '' : value}
                className={classes.textField}
                helperText={helper}
                required={required}
                margin="dense"
                variant="outlined"
                InputProps={inputProps}
                onChange={handleChange}
                type={dataType}
            />
        </FormControl>
    );
};

export default GenericTextInput;
