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

    const update = () => {
        Axios.get(APIList.account, {withCredentials: true})
            .then(res => {
                setAdminData(res.data);
            })
            .catch(() => message.error("表单信息获取失败"));
        Axios.get(APIList.userInfo, {withCredentials: true})
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(() => message.error("右侧个人信息获取失败"))
    };
    useEffect(update, []);

    const handlePut = (prop: any) => {
        Axios.put(APIList.account, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
                update();
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
                                "admin_icon": e.admin_icon == undefined ? undefined : e.admin_icon[0].thumbUrl
                            }
                        };
                        console.log(editUser);
                        handlePut(editUser);
                    }}
                    userData={adminData}/>
            </Col>
            <Col span={6} className={styles.card}>
                <Card cover={<img src={userInfo.admin_icon} alt={"logo"}/>}>
                    <Meta avatar={<Icon type={"github"}/>} title={userInfo.name}
                          description={userInfo.admin_description}/>
                </Card>
            </Col>
        </div>
    )
};
export default PageAccount;