import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';

export type GenericSwitchProps = Pick<
    SwitchProps,
    'disabled' | 'required' | 'size' | 'id' | 'checked' | 'onChange'
> & {
    label: string;
};

const GenericSwitch: React.FC<GenericSwitchProps> = ({
    label,
    ...switchProps
}) => {
    return (
        <FormControlLabel
            control={<Switch color="primary" {...switchProps} />}
            label={label}
        />
    );
};

export default GenericSwitch;
