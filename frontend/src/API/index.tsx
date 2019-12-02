const BASE = "http://localhost:8000";
export const APIList = {
    dashboard: `${BASE}/api/dashboard/`,
    repoDashboard: `${BASE}/api/repository/dashboard/`,
    repoIn: `${BASE}/api/repository/in/`,
    repoOut: `${BASE}/api/repository/out/`,
    repoTrans: `${BASE}/api/repository/trans/`,
    repoDetail: (id: number) => `${BASE}/api/repository/${id}/`,
    order: `${BASE}/api/order/`,
    client: `${BASE}/api/client/`,
    userInfo: `${BASE}/api/userInfo/`,
    account: `${BASE}/api/account/`,
    login: `${BASE}/api/login/`,
    signup: `${BASE}/api/signup/`,
};