import React from "react";

const GenColumns = () => [
    {dataIndex: "repo_mess_info", title: "调配详情", key: "repo_mess_info"},
    {
        dataIndex: "repo_in_name", title: "转出仓库名", key: "repo_in_name",
        render: (_: any, a: any, ___: any) => <a href={`/repository/${a.repo_in_id}`}>{a.repo_in_name}</a>
    },
    {
        dataIndex: "repo_out_name", title: "转入仓库名", key: "repo_out_name",
        render: (_: any, a: any, ___: any) => <a href={`/repository/${a.repo_out_id}`}>{a.repo_out_name}</a>
    },
    {dataIndex: "prod_name", title: "产品名", key: "prod_name"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    }];
export default GenColumns;