import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardDatePickerProps,
} from '@material-ui/pickers';

type GenericDatePickerProps = Pick<
    KeyboardDatePickerProps,
    | 'disabled'
    | 'disableFuture'
    | 'disablePast'
    | 'format'
    | 'readOnly'
    | 'views'
> & {
    label?: string; // TODO: cambiar a requerido
    value?: string | Date | null; // TODO: cambiar a requerido
    labelSelector?: string; // TODO: eliminar cuando ya no se use
    selectedDate?: string | Date; // TODO: eliminar cuando ya no se use
    onChange: (value: any) => void; // TODO: importar el tipo correcto
};

const GenericDatePicker: React.FC<GenericDatePickerProps> = ({
    labelSelector,
    selectedDate,
    label = labelSelector,
    value = selectedDate || '',
    onChange,
}) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                label={label}
                format="dd/MM/yyyy"
                value={value}
                onChange={onChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default GenericDatePicker;
