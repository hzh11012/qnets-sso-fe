import HttpClient from '@/lib/request';
import type { ICode, ILogin } from '@/apis/models/auth-model';

const prefix = '/auth';

export const doCode = (params: ICode) => {
    return HttpClient.post(`${prefix}/api/sso/code`, { ...params });
};

export const doLogin = (params: ILogin) => {
    return HttpClient.post(`${prefix}/api/sso/login`, { ...params });
};
