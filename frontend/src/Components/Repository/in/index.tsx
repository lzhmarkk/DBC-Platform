import {IRepositoryMessRecord} from "../interface";
import React from "react";

const GenColumns = (Action: (props: { record: any }) => JSX.Element) => [
    {
        dataIndex: "repo_mess_id", title: "转入编号", key: "repo_mess_id",
        sorter: (a: IRepositoryMessRecord, b: IRepositoryMessRecord) => parseInt(a.repo_mess_id) - parseInt(b.repo_mess_id),
    },
    {dataIndex: "repo_mess_info", title: "转入详情", key: "repo_mess_info"},

    {dataIndex: "prod_name", title: "产品", key: "prod_name"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: IRepositoryMessRecord, b: IRepositoryMessRecord) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {
        dataIndex: "repo_name", title: "仓库名", key: "repo_name",
        sorter: (a: IRepositoryMessRecord, b: IRepositoryMessRecord) => parseInt(a.repo_id) - parseInt(b.repo_id),
    },
    {
        dataIndex: "order_id", title: "订单号", key: "order_id",
        sorter: (a: IRepositoryMessRecord, b: IRepositoryMessRecord) => parseInt(a.order_id) - parseInt(b.order_id),
    },
    {
        dataIndex: "Action", title: "操作", key: "Action",
        render: (_: any, record: any, ___: any) => <Action record={record}/>
    },
];
export default GenColumns;


//这个函数负责从source中按照srcKey找到值为id的项目，并且把它的tarKey值取出
export const id2Name = (id: string, source: any[], srcKey: string, tarKey: string) => {
    const names = source.filter((k: any) => (k[srcKey] as string) == id).map(e => e[tarKey]);
    return names.length == 1 ? names[0] : "undefined";
};