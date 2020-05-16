import React, { FunctionComponent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectProps } from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginTop: '8px',
        marginBottom: '4px',
    },
    outlinedSelect: {
        padding: '11px',
    },
    outlinedSelectLabel: {
        transform: 'translate(14px, 12px) scale(1)',
    },
});

// TODO: agregar descriptiones de cada propiedad
export type GenericSelectProps = Pick<
    SelectProps,
    | 'defaultValue'
    | 'id'
    | 'multiple'
    | 'disabled'
    | 'readOnly'
    | 'required'
    | 'rows'
    | 'onChange'
> & {
    label: string;
    value: string | number | null;
    items?: Object[]; // TODO: Quitar valor opcional
    valueKey?: string;
    labelKey?: string;
    fullWidth?: boolean;
};

const GenericSelect: FunctionComponent<GenericSelectProps> = ({
    label,
    value = '',
    items = [],
    labelKey = 'label',
    valueKey = 'value',
    fullWidth = true,
    ...selectProps
}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl
            variant="outlined"
            fullWidth={fullWidth}
            className={classes.root}
        >
            <InputLabel classes={{ outlined: classes.outlinedSelectLabel }}>
                {label}
            </InputLabel>
            <Select
                classes={{ outlined: classes.outlinedSelect }}
                value={value === null ? '' : value}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                label={label}
                displayEmpty
                inputProps={{ marginDense: true }}
                {...selectProps}
            >
                {items.map((item: any) => {
                    const label = item[labelKey];
                    const value = item[valueKey];
                    return (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default GenericSelect;
