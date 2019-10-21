import {IOrder} from "../Repository/interface";
import React from "react";
import {Button, Radio} from "antd";

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
export default GenColumns;

export const orderStates: any = {"1": "草稿", "2": "已签订", "3": "已付款", "4": "已完成", "5": "已取消"};

export const getButton = (props: { record: any }, handleClick: () => void) => {
    if (props.record.state == "1")
        return (<Button icon={'snippets'} type={"dashed"} onClick={handleClick}>
            {orderStates["1"]}
        </Button>);
    else if (props.record.state == "2") return (<Button icon={'edit'} onClick={handleClick}>
        {orderStates["2"]}
    </Button>);
    else if (props.record.state == "3") return (<Button icon={'check'} type={"primary"} ghost onClick={handleClick}>
        {orderStates["3"]}
    </Button>);
    else if (props.record.state == "4") return (
        <Button icon={'check-square'} type={"primary"} onClick={handleClick}>
            {orderStates["4"]}
        </Button>);
    else if (props.record.state == "5") return (<Button icon={'close'} type={"danger"} onClick={handleClick}>
        {orderStates["5"]}
    </Button>);
};

export const genButtons = (cur: any, setNextState: (index: string) => void) => {
    if (cur == undefined) return;
    return (<div>
            <Button value={"1"} type={"dashed"} disabled={parseInt(cur.state) >= 1} onClick={() => {
                setNextState("1");
            }}>{orderStates["1"]}</Button>
            <Button value={"2"} disabled={parseInt(cur.state) >= 2} onClick={() => {
                setNextState("2");
            }}>{orderStates["2"]}</Button>
            <Button value={"3"} type={"primary"} ghost disabled={parseInt(cur.state) >= 3} onClick={() => {
                setNextState("3");
            }}>{orderStates["3"]}</Button>
            <Button value={"4"} type={"primary"} disabled={parseInt(cur.state) >= 4} onClick={() => {
                setNextState("4");
            }}>{orderStates["4"]}</Button>
            <Button value={"5"} type={"danger"} disabled={parseInt(cur.state) >= 5} onClick={() => {
                setNextState("5");
            }}>{orderStates["5"]}</Button>
        </div>
    )
};

export const genFormButtons =
    <Radio.Group>
        <Radio.Button value="1">{orderStates["1"]}</Radio.Button>
        <Radio.Button value="2">{orderStates["2"]}</Radio.Button>
        <Radio.Button value="3">{orderStates["3"]}</Radio.Button>
        <Radio.Button value="4">{orderStates["4"]}</Radio.Button>
        <Radio.Button value="5" disabled={true}>{orderStates["5"]}</Radio.Button>
    </Radio.Group>;