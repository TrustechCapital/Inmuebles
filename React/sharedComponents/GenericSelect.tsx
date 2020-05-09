import React, { FunctionComponent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
    outlinedSelect: {
        padding: '10px',
    },
    outlinedSelectLabel: {
        transform: 'translate(14px, 12px) scale(1)',
    },
}));

type Props = {
    labelId?: string; // TODO: eliminar propiedad
    selectId?: string; // TODO: eliminar propiedad
    selected?: boolean; // TODO: eliminar propiedad
    valueKey?: string;
    labelKey?: string;
    onChange: (selected: string) => void;
    label: string;
    value: any; // TODO: use generic
    items: object[];
};

const GenericSelect: FunctionComponent<Props> = ({
    label,
    value = '',
    items = [],
    valueKey,
    labelKey,
    onChange,
}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOnSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
        onChange(e.target.value as string);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
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
                onChange={handleOnSelect}
                label={label}
                displayEmpty
            >
                {items.map((item: any) => {
                    const label = item[labelKey || 'label'];
                    const value = item[valueKey || 'value'];
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
