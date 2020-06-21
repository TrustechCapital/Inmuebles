import { useField } from 'formik';
import GenericTextInput, { GenericInputProps } from '../GenericTextInput';
import CatalogSelect, { CatalogSelectProps } from '../CatalogSelect';
import GenericSelect, { GenericSelectProps } from '../GenericSelect';
import GenericSwitch, { GenericSwitchProps } from '../GenericSwitch';
import GenericDatePicker, {
    GenericDatePickerProps,
} from '../GenericDatePicker';
import GenericFileLoader, {
    GenericFileLoaderProps,
} from '../GenericFileLoader';
import GenericRadioGroup, {
    GenericRadioGroupProps,
} from '../GenericRadioGroup';

/*
 * Esta clase es un auxiliar para manejar formularios. Extiende las funcionalidades
 * de la libreria Formik para dar tipado fuerte en base a los modelos usados
 * en la aplicacion. Ejemplo de uso:
 *
 * const { FormTextField } = new GenericForm<ModeloBase>();
 *
 * y su invocacion:
 *
 * <FormTextField name="campo" label="Mi Campo" ...>
 *
 * Por defecto, Typescript validará que los valores utilizados en la propiedad name
 * sea una propiedad valida de ModeloBase.
 *
 * -----------------------------MODELOS ANIDADOS------------------------------------
 *
 *
 * Para modelos anidados se puede utilizar la propiedad namespace para indicar el "path"
 * usando la notacion punto para acceder al modelo. Ejemplo:
 *
 * class ModeloBase {...};
 * class ModeloAnidado {...};
 *
 * const ModeloBase = {
 *      nivel1: {
 *          nivel2: {
 *              modeloAnidado
 *          }
 *      }
 * }
 *
 * const { FormTextField } = new GenericForm<ModeloBase>();
 *
 * y su invocacion:
 *
 * <FormTextField<ModeloAnidado> namespace="nivel.nivel2" name="campo" label="Mi Campo" ...>
 *
 * Se especifica ModeloAnidado como tipo de dato para que Typescript nos ayude a validar
 * que los valores de la propiedad sean propiedades validas de ModeloAnidado
 *
 *
 */

/*
 * NOTA: Se utiliza "keyof Model" para decirle a TS que los valores validos de name
 * son propedades del objeto Model
 */
type FormFieldProperties<Model, InputComponent> = {
    type?: string;
    namespace?: string;
    name: Extract<keyof Model, string>;
    /*
     * NOTA: Las propiedades value y onChange no son necesarias ya que son proporcionadas
     * por el componente Field de Formik
     */
} & Omit<InputComponent, 'value' | 'onChange' | 'checked'>;

function useNamespacedField<Model, InputType>(
    props: FormFieldProperties<Model, InputType>
) {
    const newName = props.namespace
        ? `${props.namespace}.${props.name}`
        : props.name;
    return useField({
        ...props,
        name: newName,
    });
}

class GenericForm<BaseModel> {
    FormTextField<Model = BaseModel>(
        props: FormFieldProperties<Model, GenericInputProps>
    ) {
        const [field, meta] = useNamespacedField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <GenericTextInput
                {...props}
                {...field}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormCatalogSelectField<Model = BaseModel>(
        props: FormFieldProperties<Model, CatalogSelectProps>
    ) {
        const [field, meta] = useNamespacedField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <CatalogSelect
                {...props}
                {...field}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormSelectField<Model = BaseModel>(
        props: FormFieldProperties<Model, GenericSelectProps>
    ) {
        const [field, meta] = useNamespacedField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <GenericSelect
                {...props}
                {...field}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormDatePickerField<Model = BaseModel>(
        props: FormFieldProperties<Model, GenericDatePickerProps>
    ) {
        const [field, meta] = useNamespacedField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <GenericDatePicker
                {...props}
                {...field}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormSwitchField<Model = BaseModel>(
        props: FormFieldProperties<Model, GenericSwitchProps>
    ) {
        const [field] = useNamespacedField({ ...props, type: 'checkbox' });
        return <GenericSwitch {...props} {...field} />;
    }

    FormFileField<Model = BaseModel>(
        props: FormFieldProperties<Model, GenericFileLoaderProps>
    ) {
        const [field, meta] = useNamespacedField(props);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <GenericFileLoader
                {...props}
                {...field}
                error={!!meta.error}
                helperText={helperText}
            />
        );
    }

    FormRadioGroupField<Model = BaseModel>(
        props: FormFieldProperties<Model, GenericRadioGroupProps>
    ) {
        const { children, ...rest } = props;
        const [field, meta] = useField(rest);
        const helperText = meta.error ? meta.error : props.helperText;

        return (
            <GenericRadioGroup
                {...rest}
                {...field}
                error={!!meta.error}
                helperText={helperText}
            >
                {children}
            </GenericRadioGroup>
        );
    }
}

export default GenericForm;
