import React, {useEffect, useState} from "react";
import IAccountForm, {IFormPayload} from "../../Components/Account";
import Axios from "axios";
import {APIList} from "../../API";
import {message} from "antd";
import accountApiData from "../../Assets/mockingApiData/account";
import {withAuth} from "../../Components/Common/AuthWrapper";

const Page = () => {
    const [adminData, setAdminData] = useState(accountApiData);

    useEffect(() => {
        Axios.get(APIList.account)
            .then(res => {
                console.log("api的返回值：");
                console.log(res);
                console.log("返回值结束");
                setAdminData(res.data);
            })
            .catch(() => message.error("网络错误现在显示的是前端的硬编码数据\n建议查看控制台"))
    }, []);

    const handlePost = (prop: any) => {
        console.log("开始post");
        Axios.post(APIList.account, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("获取post的后台返回结果失败"));
        console.log("post完成");
    };

    return (
        <div>
            <IAccountForm
                onSubmit={(e: IFormPayload) => {
                    const editUser = {
                        "type": "EDIT_ACCOUNT",
                        "data": {
                            "admin_id": e.admin_id,
                            "name": e.name,
                            "password": e.password
                        }
                    };
                    console.log(editUser);
                    handlePost(editUser);
                }}
                userData={adminData}/>
        </div>
    )
};
const PageAccount = withAuth(Page);
export default PageAccount;