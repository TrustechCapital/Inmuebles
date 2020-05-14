import React, { FunctionComponent } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    fullWidth?: boolean;
};

const GenericTextInput: FunctionComponent<GenericInputProps> = ({
    label,
    value,
    readOnly = false,
    onChange,
    dataType = 'text',
    fullWidth = true,
    adornment,
    ...textFieldProps
}) => {
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
                fullWidth={fullWidth}
                label={label}
                value={value === null ? '' : value}
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
