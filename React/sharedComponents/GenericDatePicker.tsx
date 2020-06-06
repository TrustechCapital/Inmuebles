import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardDatePickerProps,
} from '@material-ui/pickers';

export type GenericDatePickerProps = Pick<
    KeyboardDatePickerProps,
    'disabled' | 'disableFuture' | 'disablePast' | 'readOnly' | 'views' | 'name'
> & {
    label?: string; // TODO: cambiar a requerido
    value?: string | Date | null; // TODO: cambiar a requerido
    labelSelector?: string; // TODO: eliminar cuando ya no se use
    selectedDate?: string | Date | null; // TODO: eliminar cuando ya no se use
    onChange: (value: any) => void; // TODO: importar el tipo correcto
    fullWidth?: boolean;
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
    fullWidth,
    ...datePickerProps
}) => {
    const fullWidthClassName = fullWidth === false ? '' : 'full-width';

    // IMPORTANTE: Esta funcion se utiliza para mantener consistentes los eventos
    // en el sistema (mismos de Material UI)
    function handleChange(value: any) {
        onChange({
            target: {
                value: value,
                name: datePickerProps.name, // La propiedad nombre es ocupada por el componente FormDatePickerField
            },
        });
    }

    return (
        <div className={`generic-date-picker ${fullWidthClassName}`}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <KeyboardDatePicker
                    margin="normal"
                    label={label}
                    value={getDefaultDateValue(value)}
                    onChange={handleChange}
                    inputVariant="outlined"
                    {...datePickerProps}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default GenericDatePicker;
