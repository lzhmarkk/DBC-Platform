import Axios, {AxiosRequestConfig, AxiosResponse} from "axios";

const BASE = "http://localhost:8000";
export const APIList = {
    repoDashboard: `${BASE}/api/repository/dashboard/`,
    repoIn: `${BASE}/api/repository/in/`,
    repoOut: `${BASE}/api/repository/out/`,
    repoTrans: `${BASE}/api/repository/trans/`,
    order: `${BASE}/api/order/`,
    client: `${BASE}/api/client/`,
    userInfo: `${BASE}/api/userInfo/`,
    account: `${BASE}/api/account/`,
    login: `${BASE}/api/login/`,
    checkLogin: `${BASE}/api/checkLogin/`,
    signup: `${BASE}/api/signup/`,
};

export const getAuthToken = () => {
    const token = sessionStorage.getItem('DBCToken');
    return token ? token : undefined
};
export const getAuthHeaders: () => undefined | { Authorization: string } = () => {
    const token = getAuthToken();
    return token ? {Authorization: `Token ${token}`} : undefined
};

export const setAuthToken = (token: string) => {
    sessionStorage.setItem('DBCToken', token)
};

export const AuthGet = (url: string, config?: AxiosRequestConfig) => Axios.get(url, {
    ...config, headers: (config) ? config.headers ? {
        ...config.headers, ...getAuthHeaders()
    } : getAuthHeaders() : getAuthHeaders()
});

export const AuthPost = (url: string, data?: any, config?: AxiosRequestConfig) => Axios.post(url, data, {
    ...config, headers: (config) ? config.headers ? {
        ...config.headers, ...getAuthHeaders()
    } : getAuthHeaders() : getAuthHeaders()
});
export const AuthPatch = (url: string, data?: any, config?: AxiosRequestConfig) => Axios.patch(url, data, {
    ...config, headers: (config) ? config.headers ? {
        ...config.headers, ...getAuthHeaders()
    } : getAuthHeaders() : getAuthHeaders()
});
export const AuthDelete = (url: string, data?: any, config?: AxiosRequestConfig) => Axios.delete(url, {
    params: data,
    ...config, headers: (config) ? config.headers ? {
        ...config.headers, ...getAuthHeaders()
    } : getAuthHeaders() : getAuthHeaders()
});
export const AuthPut = (url: string, data?: any, config?: AxiosRequestConfig) => Axios.put(url, data, {
    ...config, headers: (config) ? config.headers ? {
        ...config.headers, ...getAuthHeaders()
    } : getAuthHeaders() : getAuthHeaders()
});

export default APIList;