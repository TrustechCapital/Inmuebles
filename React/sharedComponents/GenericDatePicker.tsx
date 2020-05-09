import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

type Props = {
    idSelector: string;
    labelSelector: string;
    selectedDate: string;
    onChange: (value: any) => void; // TODO: importar el tipo correcto
};

const GenericDatePicker: React.FC<Props> = ({
    idSelector,
    labelSelector,
    selectedDate,
    onChange,
}) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id={idSelector}
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
