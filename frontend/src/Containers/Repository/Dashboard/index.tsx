import React, {useState} from "react";
import ReactEcharts from "echarts-for-react";
import styles from "./index.module.scss"
import getOption from "../../../Components/Repository/dashboard";
import mockingRepos from "../../../Assets/mockings/mockingRepos";

const PageRepositoryDashboard = () => {
    const count = mockingRepos.length;
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
        return mockingRepos.slice(line * graphsEachLine, graphsEachLine + line * graphsEachLine).map(e => (<ReactEcharts
            style={{height: '290px', width: '50%'}}
            className={styles.chartItem}
            option={getOption(e.repo_occupy, e.repo_capacity, e.name)}
        />))
    };
    return (
        <div>
            <div className={styles.root}>
                {genEchartLines()}
            </div>

        </div>
    );
};
export default PageRepositoryDashboard;