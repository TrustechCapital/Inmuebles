import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup';
import FormControlLabel, {
    FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { SimplifiedOnChangeSignature } from '../types';
import FormHelperText from '@material-ui/core/FormHelperText';

export type GenericRadioGroupProps = Pick<
    RadioGroupProps,
    'value' | 'children'
> & {
    name: string;
    onChange: SimplifiedOnChangeSignature;
    label: string;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
};

export const GenericRadioGroupItem = (
    props: Omit<FormControlLabelProps, 'control'>
) => {
    return <FormControlLabel {...props} control={<Radio />}></FormControlLabel>;
};

const GenericRadioGroup: React.FC<GenericRadioGroupProps> = ({
    name,
    label,
    value,
    onChange,
    children,
    error,
    helperText,
}) => {
    // IMPORTANTE: Esta funcion se utiliza para mantener consistentes los eventos
    // en el sistema (mismos de Material UI)
    function handleChange(e: any) {
        onChange({
            target: {
                value: e.target.value,
                name: name, // La propiedad nombre es ocupada por el componente FormDatePickerField
            },
        });
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                name="tipoCarga"
                value={value}
                row
                onChange={handleChange}
            >
                {children}
            </RadioGroup>
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default GenericRadioGroup;
