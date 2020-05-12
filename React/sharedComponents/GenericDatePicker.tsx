import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

type Props = {
    label?: string; // TODO: cambiar a requerido
    value?: string | Date; // TODO: cambiar a requerido
    labelSelector?: string; // TODO: eliminar cuando ya no se use
    selectedDate?: string | Date; // TODO: eliminar cuando ya no se use
    onChange: (value: any) => void; // TODO: importar el tipo correcto
};

const GenericDatePicker: React.FC<Props> = ({
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
                label={labelSelector}
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={onChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default GenericDatePicker;
