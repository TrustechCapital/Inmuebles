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
    labelId,
    selectId,
    selected = null,
    onChange,
    label,
    value,
    items = [],
    valueKey,
    labelKey,
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
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                id={selectId}
                value={value}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={handleOnSelect}
                label={label}
                displayEmpty
            >
                <MenuItem value="">
                    <em>--Seleccione--</em>
                </MenuItem>
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
