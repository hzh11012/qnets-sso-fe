import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig
} from 'axios';
import { toast } from 'sonner';

interface ApiRequest<T = any> {
    data: T;
    msg: string;
    code: number;
}

class AxiosRequest {
    private instance: AxiosInstance;
    private readonly defaultTimeout = 30 * 1000;

    constructor(config?: CreateAxiosDefaults) {
        this.instance = axios.create({
            timeout: this.defaultTimeout,
            ...config
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // 请求拦截器
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => config,
            Promise.reject
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                const { code, msg } = response.data;

                if (code !== 200) {
                    toast(msg);
                    return Promise.reject(new Error(response.data));
                }

                return response.data;
            },
            error => {
                toast(error.response.data.msg || '请求失败');
                return Promise.reject(error);
            }
        );
    }

    // 统一的请求方法
    private request<T = any>(
        method: string,
        url: string,
        config?: AxiosRequestConfig,
        data?: any
    ): Promise<ApiRequest<T>> {
        const requestConfig: AxiosRequestConfig = {
            method,
            url,
            ...config,
            ...(method === 'GET' ? { params: data } : { data })
        };

        return this.instance.request(requestConfig);
    }

    get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiRequest<T>> {
        return this.request<T>('GET', url, config);
    }

    post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiRequest<T>> {
        return this.request<T>('POST', url, config, data);
    }

    put<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiRequest<T>> {
        return this.request<T>('PUT', url, config, data);
    }

    delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ApiRequest<T>> {
        return this.request<T>('DELETE', url, config);
    }
}

const HttpClient = new AxiosRequest();

export default HttpClient;
