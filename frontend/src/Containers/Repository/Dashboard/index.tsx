import React, {useEffect, useState} from "react";
import ReactEcharts from "echarts-for-react";
import styles from "./index.module.scss"
import getOption from "../../../Components/Repository/dashboard";
import {message, Tabs} from "antd";
import RepoDetailTabs from "../../../Components/Repository/dashboard/Tabs/conf";
import dashboardApiData from "../../../Assets/mockingApiData/Repository/dashboard";
import {APIList} from "../../../API";
import Axios from 'axios'

const {TabPane} = Tabs;

export interface IDetailData {
    Messages: any[]
    RepoMessIn: any[]
    RepoMessOut: any[]
    RepoMessTrans: any[]
}

const PageRepositoryDashboard = () => {
    const [data, setData] = useState(dashboardApiData);
    const repo = data.Repo;
    const tabData: IDetailData = {
            "Messages": data.Messages,
            "RepoMessIn": data.RepoMessIn,
            "RepoMessOut": data.RepoMessOut,
            "RepoMessTrans": data.RepoMessTrans
        }
    ;
    const count = repo.length;
    const graphsEachLine = count % 4 == 1 ? 5 : 4;
    const genEchartLines = () => {
        const lines = count % graphsEachLine == 0 ? count / graphsEachLine : count / graphsEachLine + 1;
        var echartLines = [];
        for (var i = 0; i < lines; i++) {
            echartLines.push(<div className={styles.chartRow}>
                {genEchart(i)}
            </div>);
        }
        return echartLines;
    };
    const genEchart = (line: number) => {
        return repo.slice(line * graphsEachLine, graphsEachLine + line * graphsEachLine).map(e => (<ReactEcharts
            style={{height: '290px', width: '50%'}}
            className={styles.chartItem}
            option={getOption(e.repo_occupy, e.repo_capacity, e.name)}
            onEvents={{click: () => window.location.href = (`/repository/${e.repo_id}`)}}
        />))
    };
    const tabpanes = RepoDetailTabs.map(e => <TabPane tab={e.name} key={e.name}>
        <e.component data={tabData}/>
    </TabPane>);

    useEffect(() => {
        Axios.get(APIList.repoDashboard, {withCredentials: true})
            .then(res => {
                setData(res.data);
                console.log("仓库总览信息", res.data);
            })
            .catch(() => message.error("仓库总览信息获取失败"))
    }, []);
    return (
        <div>
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