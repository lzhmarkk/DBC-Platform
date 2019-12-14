import React, {useEffect, useState} from "react";
import ReactEcharts from "echarts-for-react";
import styles from "./index.module.scss"
import getOption from "../../../Components/Repository/dashboard";
import {Button, Col, message, Row, Tabs} from "antd";
import RepoDetailTabs from "../../../Components/Repository/dashboard/Tabs/conf";
import dashboardApiData from "../../../Assets/mockingApiData/Repository/dashboard";
import {APIList} from "../../../API";
import Axios from 'axios'
import INewRepoForm, {IFormPayload} from "../../../Components/Repository/dashboard/Form";

const {TabPane} = Tabs;

export interface IDetailData {
    Messages: any[]
    RepoMessIn: any[]
    RepoMessOut: any[]
    RepoMessTrans: any[]
}

const PageRepositoryDashboard = () => {
    const [data, setData] = useState(dashboardApiData);
    const [collapse, setCollapse] = useState(false);

    const repo = data.Repo;
    const tabData: IDetailData = {
        "Messages": data.Messages,
        "RepoMessIn": data.RepoMessIn,
        "RepoMessOut": data.RepoMessOut,
        "RepoMessTrans": data.RepoMessTrans
    };
    const genEchartLines = () => {
        return (
            <Row>
                {
                    repo.map(r => (
                        <Col span={8}>
                            <ReactEcharts
                                style={{height: '290px'}}
                                className={styles.chartItem}
                                option={getOption(r.repo_occupy, r.repo_capacity, r.repo_name)}
                                onEvents={{click: () => window.location.href = (`/repository/${r.repo_id}`)}}/>
                        </Col>))
                }
            </Row>);
    };
    const tabpanes = RepoDetailTabs.map(e => <TabPane tab={e.name} key={e.name}>
        <e.component data={tabData}/>
    </TabPane>);

    const handlePost = (prop: any) => {
        Axios.post(APIList.repoDashboard, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
                update();
            })
            .catch(() => message.error("仓库新建失败"));
    };
    const update = () => {
        Axios.get(APIList.repoDashboard, {withCredentials: true})
            .then(res => {
                setData(res.data);
                console.log("仓库总览信息", res.data);
            })
            .catch(() => message.error("仓库总览信息获取失败"))
    };

    useEffect(update, []);

    return (
        <div>
            {
                collapse ?
                    <div>
                        <Button style={{float: "right"}} onClick={() => setCollapse(false)}>取消</Button>
                        <INewRepoForm onSubmit={(e: IFormPayload) => {
                            setCollapse(false);
                            const newRepoInfo = {
                                "repo_name": e.repo_name,
                                "repo_capacity": e.repo_capacity,
                                "repo_place": e.repo_place
                            };
                            console.log("新仓库数据", newRepoInfo);
                            handlePost(newRepoInfo);
                        }}/>
                    </div>
                    :
                    <Button style={{float: "right"}} onClick={() => setCollapse(true)}>新建仓库</Button>
            }
            <div className={styles.root}>
                {genEchartLines()}
            </div>
            <Tabs type="card">
                {tabpanes}
            </Tabs>
        </div>
    );
};
export default PageRepositoryDashboard;