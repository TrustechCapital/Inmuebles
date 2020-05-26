export class BatchOperationError extends Error {
    failedModels: any[];
    constructor(failedModels: any[], message?: string) {
        super(
            message ||
                `La operacion realizada no pudo ser completada en su totalidad`
        );
        this.failedModels = failedModels;
    }
}
