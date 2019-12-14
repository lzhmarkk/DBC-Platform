import React, {useState, ReactElement, useEffect} from "react"
import {Layout, Button, Modal, Statistic, Icon, message} from 'antd';
import styles from "./index.module.scss"
import './index.css'
import SideMenu from "../SideMenu";
import {Redirect} from "react-router";
import moment from "moment";
import Axios from "axios";
import {APIList} from "../../API";
import apiUserInfo from "../../Assets/mockingApiData/userInfo";
import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "../../@types/store";
import {logout} from "../../Containers/Login/actions";
import {withAuth} from "../Common/AuthWrapper";

const {Header, Content, Sider} = Layout;

const Main = (props: { children: ReactElement }) => {
    const dispatch = useDispatch();
    const isLogin = useSelector<IRootStore, any>(e => e.login.loginState);

    const [collapsed, setCollapsed] = useState(false);
    const [logoutModel, setLogoutModel] = useState(false);
    const [userInfo, setUserInfo] = useState(apiUserInfo);
    const [time, setTime] = useState(moment().format("h:mm:ss"));
    setInterval(() => setTime(moment().format("h:mm:ss")), 1000);

    useEffect(() => {
        Axios.get(APIList.userInfo, {withCredentials: true})
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(() => message.error("标题栏用户信息获取失败"))
    }, []);

    const handleLogout = () => {
        Axios.post(APIList.logout, {}, {withCredentials: true})
            .then(res => {
                dispatch(logout());
            })
            .catch(() => message.error("退出登录失败"))
    };

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
                        <span>{userInfo.name}</span>
                    </div>
                    <div>
                        <Button icon={"logout"} ghost onClick={() => setLogoutModel(true)}/>
                    </div>
                </div>
            </Header>
            <Content className={styles.content}>
                {props.children}
            </Content>
            <Modal title=""
                   visible={logoutModel}
                   onCancel={() => {
                       setLogoutModel(false);
                   }}
                   onOk={() => {
                       setLogoutModel(false);
                       handleLogout();
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

    return isLogin ? layout : jump;
};
const MainLayout = withAuth(Main);
export default MainLayout;