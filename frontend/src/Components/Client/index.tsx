import React from "react";
import {Button} from "antd";

const GenColumns = (Action: (props: { record: any }) => JSX.Element) => [
    {
        dataIndex: "cust_id", title: "客户编号", key: "cust_id",
        sorter: (a: any, b: any) => parseInt(a.cust_id) - parseInt(b.cust_id),
    },
    {dataIndex: "cust_name", title: "客户名", key: "cust_name"},
    {dataIndex: "cust_email", title: "客户邮箱", key: "cust_email",},
    {dataIndex: "cust_co", title: "公司名", key: "cust_co",},
    {dataIndex: "cust_address", title: "公司地址", key: "cust_address",},
    {
        dataIndex: "cust_phone", title: "客户电话", key: "cust_phone",
        sorter: (a: any, b: any) => parseInt(a.cust_phone) - parseInt(b.cust_phone),
    },
    {
        dataIndex: "Action", title: "修改", key: "Action",
        render: (_: any, record: any, ___: any) => <Action record={record}/>
    },
];
export default GenColumns;

export const getButton = (props: { record: any }, handleClick: () => void) => {
    return (<Button onClick={handleClick}>修改客户信息</Button>);
};