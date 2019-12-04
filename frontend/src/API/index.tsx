const BASE = "http://localhost:8000";
export const APIList = {
    repoDashboard: `${BASE}/api/repository/dashboard/`,
    repoIn: `${BASE}/api/repository/in/`,
    repoOut: `${BASE}/api/repository/out/`,
    repoTrans: `${BASE}/api/repository/trans/`,
    repoDetail: (id: number) => `${BASE}/api/repository/${id}/`,
    order: `${BASE}/api/order/index/`,
    orderDetail: (id: number) => `${BASE}/api/order/${id}`,
    client: `${BASE}/api/client/index/`,
    clientDetail: (id: number) => `${BASE}/api/client/${id}`,
    account: `${BASE}/api/account/`,
    login: `${BASE}/api/login/`,
    signup: `${BASE}/api/signup/`,
    index: `${BASE}/api/index/`,
    userInfo: `${BASE}/api/userInfo/`,
    checkLogin: `${BASE}/api/checkLogin/`
};

export default APIList;