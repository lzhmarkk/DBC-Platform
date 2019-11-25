import React, {useState, ReactElement} from "react"
import {Layout, Button, Modal, message} from 'antd';
import styles from "./index.module.scss"
import Avatar from "../../Assets/logo.jpeg"
import './index.css'
import SideMenu from "../SideMenu";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "../../@types/store";
import {logout} from "../../Containers/Login/actions";

const {Header, Content, Sider} = Layout;

const MainLayout = (props: { children: ReactElement }) => {
    const dispatch = useDispatch();
    const isLogin = useSelector<IRootStore, any>(e => e.login.loginState);
    const [collapsed, setCollapsed] = useState(false);
    const [logoutModel, setLogoutModel] = useState(false);

    const layout = <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} theme="light"
               onCollapse={() => setCollapsed(!collapsed)}>
            <div className={styles.logo}>
                DBC
            </div>
            <SideMenu/>
        </Sider>

        <Layout>
            <Header className={styles.header}>
                <div className={styles.title}>
                    DBC仓库管理系统
                </div>
                <div className={styles.loginControl}>
                    <div className={styles.avatar}>
                        <img src={Avatar} alt={"avatar"}/>
                    </div>
                    <div>
                        <span>userName</span>
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
                       dispatch(logout());
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
export default MainLayout;