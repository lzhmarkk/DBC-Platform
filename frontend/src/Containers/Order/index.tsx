import React, {useState} from 'react'
import ISearchPanel from "../../Components/SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, Modal, Typography, Drawer} from 'antd';
import {IOrder} from "../../Components/Repository/interface";
import mockingOrders from "../../Assets/mockings/mockingOrders";
import GenColumns, {genButtons, getButton} from "../../Components/Order";
import INewOrderPanel, {IFormPayload} from "../../Components/Order/form";
import mockingCustomers from "../../Assets/mockings/mockingCustomers";
import {orderStates} from "../../Components/Order";

const {Title} = Typography;

const orders: IOrder[] = mockingOrders;
const PageOrder = () => {
    const [data, setData] = useState(orders);
    const [curOrder, setCurOrder] = useState();
    const [nextState, setNextState] = useState("");
    const [winOpen, setWinOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);


    const Action = (props: { record: any }) => <div className={styles.hbox}>
        {getButton(props, () => {
            setCurOrder(props.record);
            setWinOpen(true);
        })}
    </div>;
    const columns = GenColumns(Action);
    return (
        <div>
            <div className={styles.ControlPanel}>
                <ISearchPanel
                    field={{
                        "order_id": "订单编号",
                        "order_info": "订单详情",
                        "cust_id": "客户号"
                    }}
                    onSearch={(e) => !e.content ? setData(orders) :
                        setData(orders.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
                    onClear={()=>setData(orders)}
                />
                <Button icon={"plus-circle"} type={"primary"} onClick={() => setDrawerOpen(true)}>新建订单</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
            />
            <Modal title="修改状态"
                   visible={winOpen}
                   onCancel={() => {
                       setWinOpen(false);
                       setCurOrder(undefined);
                       setNextState("");

                   }}
                   onOk={() => {
                       setData(data.map((k) => k.order_id == curOrder.order_id ? {...k, "state": nextState} : k));
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
                <INewOrderPanel customer={mockingCustomers.map(k => ({"key": k.cust_id, "value": k.cust_name}))}
                                onSubmit={(e: IFormPayload) => {
                                    setDrawerOpen(false);
                                    const newOrder = {
                                        "order_id": Math.random().toString(),
                                        "cust_id": e.cust_id,
                                        "order_info": e.order_info,
                                        "order_date": e.order_date,
                                        "state": e.state
                                    };
                                    setData(data.concat(newOrder));
                                    console.log(newOrder);
                                }}/>
            </Drawer>
        </div>
    )
};
export default PageOrder;