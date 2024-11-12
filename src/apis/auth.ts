import { HttpClient } from '@/lib/request';
import type { ICode, ILogin } from '@/apis/models/auth-model';

export const doCode = (params: ICode) => {
    return HttpClient.post('/auth/api/sso/sms_code', { ...params });
};

export const doLogin = (params: ILogin) => {
    return HttpClient.post('/auth/api/sso/sms_login', { ...params });
};
