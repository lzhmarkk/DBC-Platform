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
                setAdminData(res.data);
            })
            .catch(() => message.error("表单信息获取失败"));
        Axios.get(APIList.userInfo)
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(() => message.error("右侧个人信息获取失败"))
    }, []);

    const handlePut = (prop: any) => {
        Axios.put(APIList.account, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("个人信息修改失败"));
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
                        handlePut(editUser);
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