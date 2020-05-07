export function filterEmptyParameters(parameters: object): object {
    let filteredParameters: any = {};

    for (const [key, value] of Object.entries(parameters)) {
        if (value !== null && value !== undefined) {
            Object.assign(filteredParameters, {});
            filteredParameters[key] = value;
        }
    }

    return filteredParameters;
}
