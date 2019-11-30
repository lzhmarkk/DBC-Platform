import React, {useState, ReactElement, useEffect} from "react"
import {Layout, Button, Modal, DatePicker, Statistic, Icon, message} from 'antd';
import styles from "./index.module.scss"
import Avatar from "../../Assets/logo.jpeg"
import './index.css'
import SideMenu from "../SideMenu";
import {Redirect} from "react-router";
import moment from "moment";
import Axios from "axios";
import {APIList} from "../../API";
import apiUserInfo from "../../Assets/mockingApiData/userInfo";

const {Header, Content, Sider} = Layout;

const MainLayout = (props: { children: ReactElement }) => {
    const [loginState, setLoginState] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [logout, setLogout] = useState(false);
    const [userInfo, setUserInfo] = useState(apiUserInfo);
    const [time, setTime] = useState(moment().format("h:mm:ss"));
    setInterval(() => setTime(moment().format("h:mm:ss")), 1000);

    useEffect(() => {
        Axios.get(APIList.userInfo)
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(() => message.error("获取标题栏用户信息错误"))
    }, []);


    const layout = <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} theme="light"
               onCollapse={() => setCollapsed(!collapsed)}>
            <div className={styles.logo}>
                {
                    !collapsed ?
                        <Statistic title={"当前时间"} value={time} prefix={<Icon type={"clock-circle"}/>}/> :
                        <React.Fragment> </React.Fragment>
                }
            </div>
            <SideMenu collapsed={collapsed}/>
        </Sider>

        <Layout>
            <Header className={styles.header}>
                <div className={styles.title}>
                    DBC仓库管理系统
                </div>
                <div className={styles.loginControl}>
                    <div className={styles.avatar}>
                        <img src={userInfo.admin_icon} alt={"avatar"}/>
                    </div>
                    <div>
                        <span>{userInfo.admin_name}</span>
                    </div>
                    <div>
                        <Button icon={"logout"} ghost onClick={() => setLogout(true)}/>
                    </div>
                </div>
            </Header>
            <Content className={styles.content}>
                {props.children}
            </Content>
            <Modal title=""
                   visible={logout}
                   onCancel={() => {
                       setLogout(false);
                   }}
                   onOk={() => {
                       setLogout(false);
                       setLoginState(false);
                       //todo logout
                   }}
                   okText="退出"
                   cancelText="取消"
                   okType="danger">
                <h3>
                    确认退出系统
                </h3>
            </Modal>
        </Layout>
    </Layout>;
    const jump = <Redirect to="/login"/>;

    return loginState ? layout : jump;
};
export default MainLayout;