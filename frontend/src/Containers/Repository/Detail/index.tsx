import React, {useEffect, useState} from "react";
import {Redirect, withRouter} from "react-router";
import {Card, Col, message, Row, Table, Tabs} from "antd";
import ReactEcharts from "echarts-for-react";
import styles from './index.module.scss'
import {GenColumns, GenColumnsTrans, genGraph, getOption} from "../../../Components/Repository/detail";
import detailApiData from "../../../Assets/mockingApiData/Repository/detail";
import Axios from "axios";
import {APIList} from "../../../API";

export interface IDetailData {
    repo_id: string,
    repo_name: string,
    repo_capacity: string,
    repo_occupy: string,
    RepoItem: { prod_id: string, prod_name: string, quantity: string }[],
    RepoMessIn: { repo_mess_id: string, repo_mess_info: string, prod_name: string, order_id: string, quantity: string }[],
    RepoMessOut: { repo_mess_id: string, repo_mess_info: string, prod_name: string, order_id: string, quantity: string }[],
    RepoMessTrans: { repo_out_name: string, repo_in_name: string, quantity: string, prod_name: string, repo_mess_info: string }[]
}

const PageRepositoryDetail = withRouter((props) => {
    const [data, setData] = useState(detailApiData);
    const id = props.match.params.id;

    useEffect(() => {
        if (id) {
            Axios.get(APIList.repoDetail(id), {withCredentials: true})
                .then(res => {
                    setData(res.data);
                })
                .catch(() => message.error(`仓库${id}详情获取失败`));
        }
    }, []);

    const page = <Row>
        <Col span={12} className={styles.table}>
            <ReactEcharts option={getOption(data.repo_occupy, data.repo_capacity, data.repo_name)}/>
        </Col>
        <Col span={12} className={styles.table}>
            <ReactEcharts
                option={genGraph(data.RepoItem.map(e => e.prod_name), data.RepoItem.map(e => e.quantity))}/>
        </Col>
        <Col span={12} className={styles.table}>
            <Card>
                <Table pagination={false}
                       columns={GenColumns()}
                       dataSource={data.RepoMessIn}
                       title={() => <h1>入库</h1>}
                />
            </Card>
        </Col>
        <Col span={12} className={styles.table}>
            <Card>
                <Table pagination={false}
                       columns={GenColumns()}
                       dataSource={data.RepoMessOut}
                       title={() => <h1>出库</h1>}
                />
            </Card>
        </Col>
        <Col span={24} className={styles.card}>
            <Card>
                <Table pagination={false}
                       columns={GenColumnsTrans()}
                       dataSource={data.RepoMessTrans}
                       title={() => <h1>调配</h1>}
                />
            </Card>
        </Col>
    </Row>;

    return id >= 0 ? page : <Redirect to={"/repository/dashboard"}/>;
});
export default PageRepositoryDetail;