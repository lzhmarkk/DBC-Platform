import React, {useEffect, useState} from 'react'
import {getGraph, getOption, ICardPanel} from "../../Components/Dashboard";
import ReactEcharts from "echarts-for-react";
import {Affix, Calendar, Card, Col, Icon, message, Row, Tabs} from "antd";
import styles from './index.module.scss'
import {IDetailData} from "../../Components/Dashboard/Tabs";
import RepoDetailTabs from "../../Components/Dashboard/Tabs/conf";
import indexApiData from "../../Assets/mockingApiData/dashboard";
import Axios from "axios";
import {APIList} from "../../API";
import logo from "../../Assets/logo.jpeg"

const {TabPane} = Tabs;
const {Meta} = Card;

const PageDashBoard = (props: any) => {
    const [data, setData] = useState(indexApiData);
    const messages = data.Messages.slice(0, 5);
    const tabData: IDetailData = {
        "RepoMessIn": data.RepoMessIn,
        "RepoMessOut": data.RepoMessOut,
        "RepoMessTrans": data.RepoMessTrans
    };
    const genEcharts = (line: number) => {
        return data.Repo.slice(line * 2, line * 2 + 2).map(e => (
            <ReactEcharts style={{height: '150px', width: '50%'}}
                          option={getOption(e.repo_occupy, e.repo_capacity, e.name)}/>));
    };
    const genGraph = () => {
        const name = data.Graph.map(e => e.cust_name);
        const orders = data.Graph.map(e => e.cust_orders);
        return (
            <ReactEcharts option={getGraph(name, orders)}/>
        )
    };
    const genCards = (line: number) => {
        return data.Cust.slice(line * 4, line * 4 + 4).map(e =>
            <Col span={6}>
                <Card hoverable cover={<Icon type="smile" theme={"twoTone"} twoToneColor={"#eb2f96"}/>}>
                    <Meta title={e.cust_name} description={e.cust_co}/>
                </Card>
            </Col>
        )
    };
    const tabpanes = RepoDetailTabs.map(e => <TabPane tab={e.name} key={e.name}>
        <e.component data={tabData}/>
    </TabPane>);

    useEffect(() => {
        Axios.get(APIList.dashboard)
            .then(res => {
                console.log("api的返回值：");
                console.log(res);
                console.log("返回值结束");
                setData(res.data);
            })
            .catch(() => message.error("网络错误现在显示的是前端的硬编码数据\n建议查看控制台"))
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
                <Card cover={<img src={logo} alt={"logo"}/>}>
                    <Meta avatar={<Icon type={"github"}/>} title={"lzhnb"} description={"develop"}/>
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