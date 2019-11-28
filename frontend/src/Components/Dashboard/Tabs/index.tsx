import React from "react";

export interface IDetailData {
    RepoMessIn: any[],
    RepoMessOut: any[],
    RepoMessTrans: any[]
}

const GenColumns = () => [
    {dataIndex: "repo_mess_info", title: "详情", key: "repo_mess_info"},
    {dataIndex: "quantity", title: "数量", key: "quantity",},
    {dataIndex: "repo_name", title: "仓库名", key: "repo_name"},
];
export default GenColumns;