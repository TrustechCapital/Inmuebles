import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';

type GenericSwitchProps = Pick<
    SwitchProps,
    'disabled' | 'required' | 'size' | 'id'
> & {
    checked: boolean;
    label: string;
    onChange: (checked: boolean) => void;
};

const GenericSwitch: React.FC<GenericSwitchProps> = ({
    checked,
    label,
    onChange,
}) => {
    function handleClick(e: any) {
        onChange(e.target.checked);
    }

    return (
        <FormControlLabel
            control={
                <Switch
                    color="primary"
                    checked={checked}
                    onChange={handleClick}
                />
            }
            label={label}
        />
    );
};

export default GenericSwitch;
