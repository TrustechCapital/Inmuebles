import React, { FunctionComponent, useCallback } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

export type GenericInputProps = Pick<
    TextFieldProps,
    | 'defaultValue'
    | 'disabled'
    | 'helperText'
    | 'id'
    | 'name'
    | 'multiline'
    | 'placeholder'
    | 'required'
    | 'rows'
    | 'rowsMax'
    | 'size'
    | 'onChange'
    | 'error'
> & {
    label: string;
    value: any;
    readOnly?: boolean;
    dataType?: 'text' | 'number';
    adornment?: string;
    fullWidth?: boolean;
};

const GenericTextInput: FunctionComponent<GenericInputProps> = ({
    label,
    value,
    readOnly = false,
    dataType = 'text',
    fullWidth = true,
    adornment,
    defaultValue = '',
    ...textFieldProps
}) => {
    const inputProps = {
        readOnly: readOnly,
        startAdornment: adornment ? (
            <InputAdornment position="start">{adornment}</InputAdornment>
        ) : null,
    };

    const onChange = useCallback(
        (e: any) => {
            let value = e.target.value;
            
            if (textFieldProps.onChange) {
                
                if (dataType === 'number' && value !== '') {
                    value = Number(value);
                }

                const newEventData = {
                    ...e,
                    target: {
                        ...e.target,
                        value: value,
                        name: textFieldProps.name
                    }
                }

                textFieldProps.onChange(newEventData);
            }
        },
        [textFieldProps.name, dataType]
    )
    
    let valueWithDefault = value;

    if ((value === null || value == undefined) && defaultValue !== undefined) {
        valueWithDefault = defaultValue;
    }

    return (
        <FormControl fullWidth>
            <TextField
                fullWidth={fullWidth}
                label={label}
                value={valueWithDefault}
                margin="dense"
                variant="outlined"
                InputProps={inputProps}
                type={dataType}
                {...textFieldProps}
                onChange={onChange}
            />
        </FormControl>
    );
};

export default GenericTextInput;
