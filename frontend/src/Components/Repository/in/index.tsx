import {IRepoMess} from "../interface";
import React from "react";

const GenColumns = (Action: (props: { record: any }) => JSX.Element) => [
    {
        dataIndex: "repo_mess_id", title: "转入编号", key: "repo_mess_id",
        sorter: (a: IRepoMess, b: IRepoMess) => parseInt(a.repo_mess_id) - parseInt(b.repo_mess_id),
    },
    {dataIndex: "repo_mess_info", title: "转入详情", key: "repo_mess_info"},

    {dataIndex: "prod_name", title: "产品", key: "prod_name"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: IRepoMess, b: IRepoMess) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {
        dataIndex: "name", title: "仓库名", key: "name"
    },
    {
        dataIndex: "order_id", title: "订单号", key: "order_id",
        sorter: (a: IRepoMess, b: IRepoMess) => parseInt(a.order_id) - parseInt(b.order_id),
    },
    {
        dataIndex: "Action", title: "操作", key: "Action",
        render: (_: any, record: any, ___: any) => <Action record={record}/>
    },
];
export default GenColumns;