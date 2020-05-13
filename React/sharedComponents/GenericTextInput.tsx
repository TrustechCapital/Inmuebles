import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
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

type GenericInputProps = Pick<
    TextFieldProps,
    | 'defaultValue'
    | 'disabled'
    | 'helperText'
    | 'id'
    | 'multiline'
    | 'placeholder'
    | 'required'
    | 'rows'
    | 'rowsMax'
    | 'size'
> & {
    label: string;
    value: string | number | null;
    readOnly?: boolean;
    onChange: (value: string | number | null) => void;
    dataType?: 'text' | 'number';
    adornment?: string;
};

const GenericTextInput: FunctionComponent<GenericInputProps> = ({
    label,
    value,
    readOnly = false,
    onChange,
    dataType = 'text',
    adornment,
    ...textFieldProps
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
                fullWidth
                label={label}
                value={value === null ? '' : value}
                className={classes.textField}
                margin="dense"
                variant="outlined"
                InputProps={inputProps}
                onChange={handleChange}
                type={dataType}
                {...textFieldProps}
            />
        </FormControl>
    );
};

export default GenericTextInput;
