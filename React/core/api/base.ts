import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig } from '../api.config';
import { filterEmptyParameters as removeEemptyParameters } from './utils';
import { BatchOperationError, FileUploadError } from './exceptions';

export type ModelMapper = (object: any, index: number) => any;

enum FiduciaDynamicEndpoints {
    Get = 'getRef.do',
    Execute = 'executeRef.do',
    ExecuteJava = 'executeJavaRef.do',
    UploadFile = 'upload.do',
}

export class Api {
    private api: AxiosInstance;

    public constructor(config: AxiosRequestConfig) {
        this.api = axios.create({ ...apiConfig, ...config });

        // this middleware is been called right before the http request is made.
        this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
            ...param,
        }));

        // this middleware is been called right before the response is get it by the method that triggers the request
        this.api.interceptors.response.use((param: AxiosResponse) => ({
            ...param,
        }));
    }

    public getUri(config?: AxiosRequestConfig): string {
        return this.api.getUri(config);
    }

    public request<T, R = AxiosResponse<T>>(
        config: AxiosRequestConfig
    ): Promise<R> {
        return this.api.request(config);
    }

    public get<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.get(url, config);
    }

    public delete<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.delete(url, config);
    }

    public head<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.head(url, config);
    }

    public post<T, R = AxiosResponse<T>>(
        url: string,
        data?: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.post(url, data, config);
    }

    public put<T, R = AxiosResponse<T>>(
        url: string,
        data?: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.put(url, data, config);
    }

    public patch<T, R = AxiosResponse<T>>(
        url: string,
        data?: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.patch(url, data, config);
    }

    private async sendDynamicRequest(
        endpoint: FiduciaDynamicEndpoints,
        refName: string,
        params: object,
        filterEmptyParameters: boolean = true
    ): Promise<AxiosResponse<unknown>> {
        let filteredParams = filterEmptyParameters
            ? removeEemptyParameters(params)
            : params;

        Object.assign(filteredParams, {
            id: refName,
        });

        return this.get(endpoint, {
            params: {
                json: JSON.stringify(filteredParams),
            },
        }).then((response) => {
            if (response === null) {
                throw new Error('Ocurrio un error al procesar el request');
            } else {
                return response;
            }
        });
    }

    public async getRef<T>(
        refName: string,
        params: object,
        transformer: ModelMapper
    ): Promise<T[]> {
        return this.sendDynamicRequest(
            FiduciaDynamicEndpoints.Get,
            refName,
            params
        ).then((response) => {
            const data = response.data as object[];
            return data.map(transformer);
        });
    }

    public async executeRemoteMethod(
        refName: string,
        data: object
    ): Promise<any> {
        return this.sendDynamicRequest(
            FiduciaDynamicEndpoints.ExecuteJava,
            refName,
            data,
            false
        ).then((response: any) => {
            return response.data.result;
        });
    }

    public handleBatchOperation(
        promises: Promise<any>[],
        models: any[]
    ): Promise<void> {
        return Promise.allSettled(promises).then((results) => {
            let failedModels: any[] = [];

            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    failedModels.push(models[index]);
                }
            });

            if (failedModels.length) {
                const errorMessage = `Operacion incompleta. Ocurrio un error al eliminar ${failedModels.length} de ${models.length} registro(s).`;
                throw new BatchOperationError(failedModels, errorMessage);
            }
        });
    }

    public uploadFiles(url: string, files: File[] = [], params: Object = {}) {
        var formData = new FormData();

        files.forEach((file, index) => {
            formData.append(`file_${index + 1}`, file);
        });

        Object.entries(params).forEach(([key, value]) => {
            formData.append(key, value);
        });

        return this.api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    public async uploadFilesWithProcessor(
        files: File[] = [],
        processorName: string,
        otherParams: Object = {}
    ) {
        try {
            debugger;
            await this.uploadFiles(FiduciaDynamicEndpoints.UploadFile, files, {
                ...otherParams,
                processor: processorName,
            });
        } catch (error) {
            throw new FileUploadError();
        }
    }
}
