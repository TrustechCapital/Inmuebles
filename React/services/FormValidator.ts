import * as Yup from 'yup';

function emptyStringToUndefined(value: any) {
    return isNaN(value) ? undefined : value;
}

function requiredFieldMessage(field: string) {
    return `${field} es un campo requerido`;
}

function required(field: string) {
    return Yup.mixed().required(requiredFieldMessage(field));
}

function validateRequiredNumber(field: string) {
    return Yup.number()
        .transform(emptyStringToUndefined)
        .required(requiredFieldMessage(field));
}
const FILE_SIZE_IN_MB = 3;
const EXCEL_FILES = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const ALL_ACCEPTED_FILES = [...EXCEL_FILES];

function validateFile(
    field: string,
    acceptedFormats = ALL_ACCEPTED_FILES,
    fileSize = FILE_SIZE_IN_MB
) {
    return Yup.mixed()
        .test(
            'fileRequired',
            requiredFieldMessage(field),
            async (value: File) => !!value
        )
        .test(
            'fileSize',
            'El archivo es demasiado grande',
            (value: File) => !!value && value.size <= fileSize * 1024 * 1024
        )
        .test(
            'fileType',
            'Formato no soportado',
            (value: File) => !!value && acceptedFormats.includes(value.type)
        );
}

const ValidationHelpers = {
    required,
    requiredFieldMessage,
    validateRequiredNumber,
    validateFile,
    validateFideicomiso: validateRequiredNumber('El Fideicomiso'),
    validateSubcuenta: validateRequiredNumber('La Subcuenta'),
    validateInmueble: emptyStringToUndefined('El Inmueble'),
    validateEdificio: emptyStringToUndefined('El Edificio'),
    validateDepto: emptyStringToUndefined('El Departamento'),
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
