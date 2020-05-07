export function filterEmptyParameters(parameters: object): object {
    let filteredParameters: any = {};

    for (const [key, value] of Object.entries(parameters)) {
        if (value === null || value === undefined) {
            continue;
        }

        if (typeof value === 'string' && value.trim() === '') {
            continue;
        }

        // TODO: evitar el uso de assign
        Object.assign(filteredParameters, {});
        filteredParameters[key] = value;
    }

    return filteredParameters;
}
