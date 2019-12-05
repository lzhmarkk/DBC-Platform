import React from "react";

const GenColumns = (Action: (props: { record: any }) => JSX.Element) => [
    {
        dataIndex: "repo_mess_id", title: "转出编号", key: "repo_mess_id",
        sorter: (a: any, b: any) => parseInt(a.repo_mess_id) - parseInt(b.repo_mess_id),
    },
    {dataIndex: "repo_mess_info", title: "转出详情", key: "repo_mess_info"},
    {
        dataIndex: "prod_name", title: "产品", key: "prod_name",
        sorter: (a: any, b: any) => parseInt(a.prod_id) - parseInt(b.prod_id),
    },
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {
        dataIndex: "repo_name", title: "仓库名", key: "repo_name",
        sorter: (a: any, b: any) => parseInt(a.repo_id) - parseInt(b.repo_id),
        render: (_: any, a: any, ___: any) => <a href={`/repository/${a.repo_id}`}>{a.repo_name}</a>
    },
    {
        dataIndex: "order_id", title: "订单号", key: "order_id",
        sorter: (a: any, b: any) => parseInt(a.order_id) - parseInt(b.order_id),
        render: (_: any, a: any, ___: any) => <a href={`/order/${a.order_id}`}>{a.order_id}</a>
    },
    {
        dataIndex: "Action", title: "操作", key: "Action",
        render: (_: any, record: any, ___: any) => <Action record={record}/>
    },
];
export default GenColumns;