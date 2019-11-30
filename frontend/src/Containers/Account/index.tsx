import React, {useEffect, useState} from "react";
import IAccountForm, {IFormPayload} from "../../Components/Account";
import Axios from "axios";
import {APIList} from "../../API";
import {Card, Col, Icon, message} from "antd";
import accountApiData from "../../Assets/mockingApiData/account";
import styles from "../DashBoard/index.module.scss";
import apiUserInfo from "../../Assets/mockingApiData/userInfo";

const {Meta} = Card;
const PageAccount = () => {
    const [adminData, setAdminData] = useState(accountApiData);
    const [userInfo, setUserInfo] = useState(apiUserInfo);

    useEffect(() => {
        Axios.get(APIList.account)
            .then(res => {
                console.log("api的返回值：");
                console.log(res);
                console.log("返回值结束");
                setAdminData(res.data);
            })
            .catch(() => message.error("获取表单个人信息错误"));
        Axios.get(APIList.userInfo)
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(() => message.error("获取右侧个人头像信息错误"))
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
            <Col span={18}>
                <IAccountForm
                    onSubmit={(e: IFormPayload) => {
                        const editUser = {
                            "type": "EDIT_ACCOUNT",
                            "data": {
                                "admin_id": e.admin_id,
                                "name": e.name,
                                "password": e.password,
                                "admin_description": e.admin_description,
                                "admin_icon": e.admin_icon[0].thumbUrl
                            }
                        };
                        console.log(editUser);
                        handlePost(editUser);
                    }}
                    userData={adminData}/>
            </Col>
            <Col span={6} className={styles.card}>
                <Card cover={<img src={userInfo.admin_icon} alt={"logo"}/>}>
                    <Meta avatar={<Icon type={"github"}/>} title={userInfo.admin_name}
                          description={userInfo.admin_description}/>
                </Card>
            </Col>
        </div>
    )
};
export default PageAccount;