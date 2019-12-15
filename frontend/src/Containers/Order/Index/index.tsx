import React, {useEffect, useState} from 'react'
import ISearchPanel from "../../../Components/SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, Drawer, message, Card, Spin} from 'antd';
import {GenColumns, getButton, getGraph} from "../../../Components/Order";
import IOrderPanel, {IFormPayload} from "../../../Components/Order/form";
import orderApiData from "../../../Assets/mockingApiData/Order/order";
import Axios from "axios";
import {APIList} from "../../../API";
import ReactEcharts from "echarts-for-react";

const PageOrderIndex = () => {
    const [apiData, setApiData] = useState(orderApiData);
    const [listData, setListData] = useState(orderApiData.Order);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const update = () => {
        setLoading(true);
        Axios.get(APIList.order, {withCredentials: true})
            .then(res => {
                setApiData(res.data);
                setListData(res.data.Order);
                console.log("订单信息", res.data);
                setLoading(false);
            })
            .catch(() => message.error("订单信息获取失败"))
    };
    useEffect(update, []);

    const handlePost = (prop: any) => {
        Axios.post(APIList.order, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
                update();
            })
            .catch(() => message.error("订单新建失败"));
    };

    const Action = (props: { record: any }) => <div className={styles.hbox}>
        {getButton(props, () => window.location.href = `/order/${props.record.order_id}`)}
    </div>;
    const genGraph = () => {
        let max = 0;
        const x = apiData.Graph.map(e => e.date);
        const y = apiData.Graph.map(e => e.value);
        y.forEach(e => parseInt(e) > max ? max = parseInt(e) : max);

        return (
            <ReactEcharts option={getGraph(x, y, max)}/>
        )
    };
    const columns = GenColumns(Action);
    const content = (
        <div>
            <div style={{paddingBottom: "60px"}}>
                <Card title={"订单变化曲线"} type={"inner"}>
                    {genGraph()}
                </Card>
            </div>
            <div className={styles.ControlPanel}>
                <ISearchPanel
                    field={{
                        "order_id": "订单编号",
                        "order_info": "订单详情",
                        "cust_name": "客户名",
                        "cust_co": "公司名"
                    }}
                    onSearch={(e) => !e.content ? setListData(apiData.Order) :
                        setListData(apiData.Order.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
                    onClear={() => setListData(apiData.Order)}
                />
                <Button icon={"plus-circle"} type={"primary"} onClick={() => setDrawerOpen(true)}>新建订单</Button>
            </div>
            <Table
                columns={columns}
                dataSource={listData}
                rowKey={listData => listData.order_id}
            />

            <Drawer title={"新增订单"}
                    width={720}
                    onClose={() => setDrawerOpen(false)}
                    visible={drawerOpen}>
                <IOrderPanel init={undefined}
                             customer={apiData.Cust.map(k => ({
                                     "key": k.cust_id,
                                     "value": k.cust_name + " ( " + k.cust_co + " )"
                                 })
                             )}
                             onSubmit={(e: IFormPayload) => {
                                 setDrawerOpen(false);
                                 const newOrder = {
                                     "type": "NEW_ORDER",
                                     "data": {
                                         "cust_id": e.cust_id,
                                         "order_info": e.order_info,
                                         "order_date": e.order_date,
                                         "state": e.state,
                                         "order_amount": e.order_amount,
                                         "order_payee": e.order_payee,
                                         "order_payer": e.order_payer,
                                         "order_pay_type": e.order_pay_type,
                                         "order_serial": e.order_serial,
                                         "order_payee_card": e.order_payee_card,
                                         "order_payee_bank": e.order_payee_bank,
                                         "order_tex": e.order_tex,
                                         "order_payer_card": e.order_payer_card,
                                         "order_payer_bank": e.order_payer_bank,
                                         "order_description": e.order_description,
                                         "Prod": e.Prod
                                     }
                                 };
                                 console.log("表单数据");
                                 console.log(newOrder);
                                 handlePost(newOrder);
                             }}/>
            </Drawer>
        </div>
    );
    return loading ? <Spin/> : content;
};
export default PageOrderIndex;