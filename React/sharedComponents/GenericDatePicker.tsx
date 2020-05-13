import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardDatePickerProps,
} from '@material-ui/pickers';

type GenericDatePickerProps = Pick<
    KeyboardDatePickerProps,
    'disabled' | 'disableFuture' | 'disablePast' | 'readOnly' | 'views'
> & {
    label?: string; // TODO: cambiar a requerido
    value?: string | Date | null; // TODO: cambiar a requerido
    labelSelector?: string; // TODO: eliminar cuando ya no se use
    selectedDate?: string | Date | null; // TODO: eliminar cuando ya no se use
    onChange: (value: any) => void; // TODO: importar el tipo correcto
};

function getDefaultDateValue(value?: string | Date | null): Date | string {
    if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '')
    ) {
        return new Date();
    }

    return value;
}

const GenericDatePicker: React.FC<GenericDatePickerProps> = ({
    labelSelector,
    selectedDate,
    label = labelSelector,
    value,
    onChange,
    ...datePickerProps
}) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                label={label}
                format="dd/MM/yyyy"
                value={getDefaultDateValue(value)}
                onChange={onChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                {...datePickerProps}
            />
        </MuiPickersUtilsProvider>
    );
};

export default GenericDatePicker;
