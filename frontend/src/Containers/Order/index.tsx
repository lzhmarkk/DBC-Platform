import React, {useEffect, useState} from 'react'
import ISearchPanel from "../../Components/SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, Modal, Typography, Drawer, message, Card} from 'antd';
import GenColumns, {genButtons, getButton, getGraph} from "../../Components/Order";
import INewOrderPanel, {IFormPayload} from "../../Components/Order/form";
import {orderStates} from "../../Components/Order";
import orderApiData from "../../Assets/mockingApiData/order";
import Axios from "axios";
import {APIList} from "../../API";
import ReactEcharts from "echarts-for-react";

const {Title} = Typography;

const PageOrder = () => {
    const [apiData, setApiData] = useState(orderApiData);
    const [listData, setListData] = useState(orderApiData.Order);

    const [curOrder, setCurOrder] = useState();
    const [nextState, setNextState] = useState("");
    const [winOpen, setWinOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        Axios.get(APIList.order)
            .then(res => {
                setApiData(res.data);
                setListData(res.data.Order);
            })
            .catch(() => message.error("订单信息获取失败"))
    }, []);

    const onChangeState = () => {
        const changeState = {
            "type": "CHANGE_ORDER_STATE",
            "data": {
                "order_id": curOrder.order_id,
                "state": nextState.toString()
            }
        };
        console.log(changeState);
        handlePut(changeState);
    };
    const handlePost = (prop: any) => {
        Axios.post(APIList.order, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("订单新建失败"));
    };

    const handlePut = (prop: any) => {
        Axios.put(APIList.client, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("订单修改失败"));
    };
    const Action = (props: { record: any }) => <div className={styles.hbox}>
        {getButton(props, () => {
            setCurOrder(props.record);
            setWinOpen(true);
        })}
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
    return (
        <div>
            <div style={{paddingBottom: "60px"}}>
                <Card title={"订单曲线"} type={"inner"}>
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
            />
            <Modal title="修改状态"
                   visible={winOpen}
                   onCancel={() => {
                       setWinOpen(false);
                       setCurOrder(undefined);
                       setNextState("");

                   }}
                   onOk={() => {
                       onChangeState();
                       setWinOpen(false);
                       setCurOrder(undefined);
                       setNextState("");
                   }}
                   okText="确定"
                   cancelText="取消"
            >
                {genButtons(curOrder, setNextState)}
                <div>
                    <Title
                        level={3}>将{curOrder == undefined ? "" : curOrder.order_info}的状态改为{orderStates[nextState]}</Title>
                </div>
            </Modal>
            <Drawer title={"新增订单"}
                    width={720}
                    onClose={() => setDrawerOpen(false)}
                    visible={drawerOpen}>
                <INewOrderPanel customer={apiData.Cust.map(k => ({
                    "key": k.cust_id, "value": k.cust_name + " ( " + k.cust_co + " )"
                }))}
                                onSubmit={(e: IFormPayload) => {
                                    setDrawerOpen(false);
                                    const newOrder = {
                                        "type": "NEW_ORDER",
                                        "data": {
                                            "cust_id": e.cust_id,
                                            "order_info": e.order_info,
                                            "order_date": e.order_date,
                                            "state": e.state
                                        }
                                    };
                                    console.log("表单数据");
                                    console.log(newOrder);
                                    handlePost(newOrder);
                                }}/>
            </Drawer>
        </div>
    )
};
export default PageOrder;