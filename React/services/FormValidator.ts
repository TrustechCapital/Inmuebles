import * as Yup from 'yup';

function emptyStringToUndefined(value: any) {
    return isNaN(value) ? undefined : value;
}

function validateRequiredNumber(field: string) {
    const errorMessage = `${field} es un campo requerido`;
    return Yup.number()
        .transform(emptyStringToUndefined)
        .required(errorMessage);
}

const ValidationHelpers = {
    validateRequiredNumber: validateRequiredNumber,
    validateFideicomiso: validateRequiredNumber('El Fideicomiso'),
    validateSubcuenta: validateRequiredNumber('La Subcuenta'),
};

class FormValidator<Model> {
    validationSchema: Yup.ObjectSchema<
        Yup.Shape<object | undefined, Partial<Model>>
    >;

    constructor(fields: Yup.ObjectSchemaDefinition<Partial<Model>>) {
        this.validationSchema = Yup.object().shape<Partial<Model>>(fields);
    }
}

export default FormValidator;
export { ValidationHelpers };
