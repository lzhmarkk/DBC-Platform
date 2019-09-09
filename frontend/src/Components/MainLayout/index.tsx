import React, {useState, ReactElement} from "react"
import {Layout, Button} from 'antd';
import styles from "./index.module.scss"
import Avatar from "../../Assets/logo.jpeg"
import './index.css'
import SideMenu from "../SideMenu";

const {Header, Content, Sider} = Layout;

const MainLayout = (props: { children: ReactElement }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} theme="light"
                   onCollapse={() => setCollapsed(!collapsed)}>
                <div className={styles.logo}>
                    BUAA
                </div>
                <SideMenu/>
            </Sider>

            <Layout>
                <Header className={styles.header}>
                    <div className={styles.title}>
                        打作业
                    </div>
                    <div className={styles.loginControl}>
                        <div className={styles.avatar}>
                            <img src={Avatar} alt={"avatar"}/>
                        </div>
                        <div>
                            <span>曲硕nb</span>
                        </div>
                        <div>
                            <Button icon={"logout"} ghost/>
                        </div>
                    </div>
                </Header>
                <Content className={styles.content}>
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
};
export default MainLayout;