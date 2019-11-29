import React from "react";

const GenColumns = () => [
    {dataIndex: "repo_mess_info", title: "调配详情", key: "repo_mess_info"},
    {dataIndex: "repo_in_name", title: "转出仓库名", key: "repo_in_name"},
    {dataIndex: "repo_out_name", title: "转入仓库名", key: "repo_out_name"},
    {dataIndex: "prod_name", title: "产品名", key: "prod_name"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    }];
export default GenColumns;