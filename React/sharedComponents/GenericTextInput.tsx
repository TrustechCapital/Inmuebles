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
    dataType?: 'text' | 'number' | 'money' | 'string';
    adornment?: string;
    fullWidth?: boolean;
};

const GenericTextInput: FunctionComponent<GenericInputProps> = ({
    label = 'Campo',
    value = 'valor',
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
            console.log('textFieldProps.onChange');

            if (textFieldProps.onChange) {

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
    );

    let valueWithDefault = value;

    if (valueWithDefault === '' || valueWithDefault === null) {
        valueWithDefault = defaultValue;
    }

    return (
        <FormControl fullWidth>
            <TextField
                fullWidth={fullWidth}
                label={label}
                value={valueWithDefault}
                variant="outlined"
                InputProps={inputProps}
                type={dataType}
                onChange={onChange}
                {...textFieldProps}
            />
        </FormControl>
    );
};

export default GenericTextInput;
