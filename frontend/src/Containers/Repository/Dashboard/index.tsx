import React, {useState} from "react";
import ReactEcharts from "echarts-for-react";
import styles from "./index.module.scss"
import getOption from "../../../Components/Repository/dashboard";
import mockingRepos from "../../../Assets/mockings/mockingRepos";
import {Tabs} from "antd";
import RepoDetailTabs from "../../../Components/Repository/dashboard/Tabs/conf";
import {IRepositoryMessRecord, IRepositoryRecord, IWorkMessRecord} from "../../../Components/Repository/interface";
import mockingWorkMessages from "../../../Assets/mockings/mockingWorkMessages";
import mockingRepoMessages from "../../../Assets/mockings/mockingRepoMessages";

const {TabPane} = Tabs;

export interface IDetailData {
    Messages: IWorkMessRecord[]
    RepoMessIn: IRepositoryMessRecord[]
    RepoMessOut: IRepositoryMessRecord[]
    RepoMessTrans: any
}

const PageRepositoryDashboard = () => {
    const data: IRepositoryRecord[] = mockingRepos;
    const tabData: IDetailData = {
            "Messages": mockingWorkMessages,
            "RepoMessIn": mockingRepoMessages,
            "RepoMessOut": mockingRepoMessages,
            "RepoMessTrans": []
        }
    ;
    const count = data.length;
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
        return data.slice(line * graphsEachLine, graphsEachLine + line * graphsEachLine).map(e => (<ReactEcharts
            style={{height: '290px', width: '50%'}}
            className={styles.chartItem}
            option={getOption(e.repo_occupy, e.repo_capacity, e.name)}
        />))
    };
    const tabpanes = RepoDetailTabs.map(e => <TabPane tab={e.name} key={e.name}>
        <e.component data={tabData}/>
    </TabPane>);
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