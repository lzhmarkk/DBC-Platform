import React, {useEffect, useState} from 'react'
import {getGraph, getOption, ICardPanel} from "../../Components/Dashboard";
import ReactEcharts from "echarts-for-react";
import {Calendar, Card, Col, Icon, message, Row, Tabs} from "antd";
import styles from './index.module.scss'
import {IDetailData} from "../../Components/Dashboard/Tabs";
import RepoDetailTabs from "../../Components/Dashboard/Tabs/conf";
import indexApiData from "../../Assets/mockingApiData";
import Axios from "axios";
import {APIList} from "../../API";
import logo from "../../Assets/logo.jpeg"
import apiUserInfo from "../../Assets/mockingApiData/userInfo";

const {TabPane} = Tabs;
const {Meta} = Card;

const PageDashBoard = (props: any) => {
    const [data, setData] = useState(indexApiData);
    const [userInfo, setUserInfo] = useState(apiUserInfo);
    const messages = data.Messages.slice(0, 5);
    const tabData: IDetailData = {
        "RepoMessIn": data.RepoMessIn,
        "RepoMessOut": data.RepoMessOut,
        "RepoMessTrans": data.RepoMessTrans
    };
    const genEcharts = (line: number) => {
        return data.Repo.slice(line * 2, line * 2 + 2).map(e => (
            <ReactEcharts style={{height: '150px', width: '50%'}}
                          option={getOption(e.repo_occupy, e.repo_capacity, e.name)}
                          onEvents={{click: () => window.location.href = (`/repository/${e.repo_id}`)}}
            />));
    };
    const genGraph = () => {
        const name = data.Graph.map(e => e.cust_name);
        const orders = data.Graph.map(e => e.cust_orders);
        return (
            <ReactEcharts option={getGraph(name, orders)}/>
        )
    };
    const tabpanes = RepoDetailTabs.map(e => <TabPane tab={e.name} key={e.name}>
        <e.component data={tabData}/>
    </TabPane>);

    useEffect(() => {
        Axios.get(APIList.index, {withCredentials: true})
            .then(res => {
                setData(res.data);
                console.log("首页信息", res.data);
            })
            .catch(() => message.error("首页信息获取失败"));
        Axios.get(APIList.userInfo, {withCredentials: true})
            .then(res => {
                setUserInfo(res.data);
                console.log("个人信息", res.data);
            })
            .catch(() => message.error("右侧个人信息获取失败"))
    }, []);

    return (
        <Row>
            <Col span={8} className={styles.card}> <ICardPanel messages={messages}/></Col>
            <Col span={10} className={styles.card}>
                <Card title={"仓库情况"} type={"inner"}>
                    <div className={styles.chartRow}>{genEcharts(0)}</div>
                    <div className={styles.chartRow}>{genEcharts(1)}</div>
                </Card>
            </Col>
            <Col span={6} className={styles.card}>
                <Card cover={<img src={userInfo.admin_icon} alt={"logo"}/>}>
                    <Meta avatar={<Icon type={"github"}/>} title={userInfo.name}
                          description={userInfo.admin_description}/>
                </Card>
            </Col>
            <Col span={8} className={styles.card}>
                <Tabs type="card">
                    {tabpanes}
                </Tabs>
            </Col>
            <Col span={10} className={styles.card}>
                <Card title={"合作伙伴"} type={"inner"}>
                    {genGraph()}
                </Card>
            </Col>
            <Col span={6} className={styles.card}>
                <Calendar fullscreen={false}/>
            </Col>
        </Row>
    )
};
export default PageDashBoard;