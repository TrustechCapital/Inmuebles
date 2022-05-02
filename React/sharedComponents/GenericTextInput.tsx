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
    label = 'Campo',
    value = '',
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

    const handleBlur = useCallback(
        (e: any) => {
            let value = e.target.value;

            if (textFieldProps.onChange) {

                if (adornment && adornment === '$') {
                    value = (parseFloat(value)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    if (value === 'NaN') value = 0.00;
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
                {...textFieldProps}
                onBlur={handleBlur}
            />
        </FormControl>
    );
};

export default GenericTextInput;

