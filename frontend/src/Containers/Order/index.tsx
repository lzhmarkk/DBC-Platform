import React, {useState} from 'react'
import ISearchPanel from "../../Components/SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, Modal, Typography, Dropdown} from 'antd';
import {IOrder} from "../../Components/Repository/interface";
import mockingOrders from "../../Assets/mockings/mockingOrders";

const {Title} = Typography;

const orders: IOrder[] = mockingOrders;
const reserved: any = {"1": "草稿", "2": "已签订", "3": "已付款", "4": "已完成", "5": "已取消"};
const PageOrder = () => {
    const [data, setData] = useState(orders);
    const [curOrder, setCurOrder] = useState();
    const [nextState, setNextState] = useState("");
    const [winOpen, setWinOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const genButton = (props: { record: any }) => {
        if (props.record.state == "1")
            return (<Button icon={'snippets'} type={"dashed"} onClick={() => {
                setCurOrder(props.record);
                setWinOpen(true);
            }}>
                {reserved["1"]}
            </Button>);
        else if (props.record.state == "2") return (<Button icon={'edit'} onClick={() => {
            setCurOrder(props.record);
            setWinOpen(true);
        }}>
            {reserved["2"]}
        </Button>);
        else if (props.record.state == "3") return (<Button icon={'check'} type={"primary"} ghost onClick={() => {
            setCurOrder(props.record);
            setWinOpen(true);
        }}>
            {reserved["3"]}
        </Button>);
        else if (props.record.state == "4") return (<Button icon={'check-square'} type={"primary"} onClick={() => {
            setCurOrder(props.record);
            setWinOpen(true);
        }}>
            {reserved["4"]}
        </Button>);
        else if (props.record.state == "5") return (<Button icon={'close'} type={"danger"} onClick={() => {
            setCurOrder(props.record);
            setWinOpen(true);
        }}>
            {reserved["5"]}
        </Button>);
    };
    const genButtons = () => {
        if (curOrder == undefined) return;
        return (<div>
                <Button type={"dashed"} disabled={parseInt(curOrder.state) >= 1} onClick={() => {
                    setNextState("1");
                }}>{reserved["1"]}</Button>
                <Button disabled={parseInt(curOrder.state) >= 2} onClick={() => {
                    setNextState("2");
                }}>{reserved["2"]}</Button>
                <Button type={"primary"} disabled={parseInt(curOrder.state) >= 3} ghost onClick={() => {
                    setNextState("3");
                }}>{reserved["3"]}</Button>
                <Button type={"primary"} disabled={parseInt(curOrder.state) >= 4} onClick={() => {
                    setNextState("4");
                }}>{reserved["4"]}</Button>
                <Button type={"danger"} disabled={parseInt(curOrder.state) >= 5} onClick={() => {
                    setNextState("5");
                }}>{reserved["5"]}</Button>
            </div>
        )
    };
    const Action = (props: { record: any }) => <div className={styles.hbox}>
        {genButton(props)}
    </div>;
    const GenColumns = (Action: (props: { record: any }) => JSX.Element) => [
        {
            dataIndex: "order_id", title: "订单编号", key: "order_id",
            sorter: (a: IOrder, b: IOrder) => parseInt(a.order_id) - parseInt(b.order_id),
        },
        {dataIndex: "order_info", title: "订单详情", key: "order_info"},
        {
            dataIndex: "order_date", title: "订单时间", key: "order_date",
            sorter: (a: IOrder, b: IOrder) => parseInt(a.order_date) - parseInt(b.order_date),
        },
        {
            dataIndex: "cust_id", title: "客户号", key: "cust_id",
            sorter: (a: IOrder, b: IOrder) => parseInt(a.cust_id) - parseInt(b.cust_id),
        },
        {
            dataIndex: "Action", title: "订单状态", key: "Action",
            render: (_: any, record: any, ___: any) => <Action record={record}/>
        },
    ];
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
                />
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
                {genButtons()}
                <div>
                    <Title
                        level={3}>将{curOrder == undefined ? "" : curOrder.order_info}的状态改为{reserved[nextState]}</Title>
                </div>
            </Modal>
        </div>
    )
};
export default PageOrder;