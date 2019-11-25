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
    checkLogin: `${BASE}/api/checkLogin/`
};

export const getAuthToken = (): object => {
    const token = sessionStorage.getItem('DBCToken');
    console.log("DBCToken:", token);
    return token !== undefined ? {Authorization: `Token ${token}`} : {}
};

export const setAuthToken = (token: string) => {
    sessionStorage.setItem('DBCToken', token)
};

export default APIList;