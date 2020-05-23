import { Field, useField } from 'formik';
import GenericTextInput, { GenericInputProps } from '../GenericTextInput';
import CatalogSelect, { CatalogSelectProps } from '../CatalogSelect';
import GenericSelect, { GenericSelectProps } from '../GenericSelect';
import GenericSwitch, { GenericSwitchProps } from '../GenericSwitch';
import GenericDatePicker, {
    GenericDatePickerProps,
} from '../GenericDatePicker';

/*
 * Esta clase es un auziliar para manejar formularios. Extiende las funcionalidades
 * de la libreria Formik para dar tipado fuerte en base a los modelos usados
 * en la aplicacion. Ejemplo de uso:
 *
 * const { FormTextField } = new GenericForm<CUALQUIER_MODELO>();
 *
 * y su invocacion:
 *
 * <FormTextField name="campo" label="Mi Campo" ...>
 *
 *
 */

/*
 * NOTA: Se utiliza "keyof Model" para decirle a TS que los valores validos de name
 * son propedades del objeto Model
 */
type ValidModelName<Model> = {
    name: Extract<keyof Model, string>;
};

/*
 * NOTA: Las propiedades value y onChange no son necesarias ya que son proporcionadas
 * por el componente Field de Formik
 */
type OmittedProperties<Component> = Omit<
    Component,
    'value' | 'onChange' | 'checked'
>;

class GenericForm<Model> {
    FormTextField(
        props: ValidModelName<Model> & OmittedProperties<GenericInputProps>
    ) {
        const [field, meta] = useField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <GenericTextInput
                {...field}
                {...props}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormCatalogSelectField(
        props: ValidModelName<Model> & OmittedProperties<CatalogSelectProps>
    ) {
        const [field, meta] = useField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <CatalogSelect
                {...field}
                {...props}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormSelectField(
        props: ValidModelName<Model> & OmittedProperties<GenericSelectProps>
    ) {
        const [field, meta] = useField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <GenericSelect
                {...field}
                {...props}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormDatePickerField(
        props: ValidModelName<Model> & OmittedProperties<GenericDatePickerProps>
    ) {
        return <Field {...props} as={GenericDatePicker} />;
    }

    FormSwitchField(
        props: ValidModelName<Model> & OmittedProperties<GenericSwitchProps>
    ) {
        const [field] = useField({ ...props, type: 'checkbox' });
        return <GenericSwitch {...field} {...props} />;
    }
}

export default GenericForm;
