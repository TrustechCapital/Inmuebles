import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig } from '../api.config';
import { filterEmptyParameters } from './utils';

export type ModelMapper = (object: any, index: number) => any;

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

    public async getRef<T>(
        refName: string,
        params: object,
        transformer: ModelMapper
    ): Promise<T[]> {
        let filteredParams = filterEmptyParameters(params);

        Object.assign(filteredParams, {
            id: refName,
        });

        return this.get('getRef.do', {
            params: {
                json: JSON.stringify(filteredParams),
            },
        }).then((response) => {
            const data = response.data as object[];

            return data.map(transformer);
        });
    }
}
