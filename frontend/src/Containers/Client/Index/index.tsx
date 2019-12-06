import React, {useEffect, useState} from 'react'
import ISearchPanel from "../../../Components/SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, message, Card} from 'antd';
import Axios from "axios";
import {APIList} from "../../../API";
import clientApiData from "../../../Assets/mockingApiData/Client/client";
import {INewClientFormPayload} from "../../../Components/Client/form/newClientForm";
import GenColumns from "../../../Components/Client";
import INewClientForm from "../../../Components/Client/form/newClientForm";
import ReactEcharts from "echarts-for-react";
import {getGraph} from "../../../Components/Dashboard";


const PageClientIndex = () => {
    const [apiData, setApiData] = useState(clientApiData);
    const [listData, setListData] = useState(clientApiData.Cust);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const update = () => {
        Axios.get(APIList.client, {withCredentials: true})
            .then(res => {
                setApiData(res.data);
                setListData(res.data.Cust);
            })
            .catch(() => message.error("客户信息获取失败"))
    };
    useEffect(update, []);

    const handlePost = (prop: any) => {
        Axios.post(APIList.client, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("客户信息新建失败"));
        update();
    };

    const Action = (props: { record: any }) =>
        <div className={styles.hbox}>
            <Button onClick={() => window.location.href = `/client/${props.record.cust_id}`}>
                查看详细信息
            </Button>
        </div>;

    const genGraph = () => {
        const name = apiData.Graph.map(e => e.cust_name);
        const orders = apiData.Graph.map(e => e.cust_orders);
        return (
            <ReactEcharts option={getGraph(name, orders)}/>
        )
    };
    const columns = GenColumns(Action);
    return (
        <div>
            <div style={{paddingBottom: "60px"}}>
                <Card title={"合作伙伴"} type={"inner"}>
                    {genGraph()}
                </Card>
            </div>
            <div className={styles.ControlPanel}>
                <ISearchPanel
                    field={{
                        "cust_id": "客户编号",
                        "cust_name": "客户名",
                        "cust_email": "客户邮箱",
                        "cust_co": "公司名",
                        "cust_address": "公司地址",
                        "cust_phone": "客户电话"
                    }}
                    onSearch={(e) => !e.content ? setListData(apiData.Cust) :
                        setListData(apiData.Cust.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
                    onClear={() => setListData(apiData.Cust)}
                />
                <Button icon={"plus-circle"} type={"primary"} onClick={() => setDrawerOpen(true)}>新增客户</Button>
            </div>
            <Table
                columns={columns}
                dataSource={listData}
                rowKey={listData => listData.cust_id}
            />

            <INewClientForm
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onSubmit={(e: INewClientFormPayload) => {
                    setDrawerOpen(false);
                    const newClient = {
                        "type": "NEW_CUST",
                        "data": {
                            "cust_name": e.cust_name,
                            "cust_email": e.cust_email,
                            "cust_co": e.cust_co,
                            "cust_address": e.cust_address,
                            "cust_phone": e.cust_phone,
                            "cust_icon": e.cust_icon == undefined ? undefined : e.cust_icon[0].thumbUrl,
                            "cust_wechat": e.cust_wechat,
                            "cust_qq": e.cust_qq,
                            "cust_duty": e.cust_duty,
                            "cust_business_scope": e.cust_business_scope,
                        }
                    };
                    console.log("新建表单数据", newClient);
                    handlePost(newClient);
                }}
            />
        </div>
    )
};
export default PageClientIndex;