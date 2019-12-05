import React from "react";

export interface IDetailData {
    RepoMessIn: any[],
    RepoMessOut: any[],
    RepoMessTrans: any[]
}

export const GenColumns = () => [
    {dataIndex: "repo_mess_info", title: "详情", key: "repo_mess_info"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {
        dataIndex: "repo_name", title: "仓库名", key: "repo_name",
        render: (_: any, a: any, ___: any) => <a href={`/repository/${a.repo_id}`}>{a.repo_name}</a>
    },
];

export const GenColumnsTrans = () => [
    {dataIndex: "repo_mess_info", title: "详情", key: "repo_mess_info"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {
        dataIndex: "repo_in_name", title: "转入仓库名", key: "repo_in_name",
        render: (_: any, a: any, ___: any) => <a href={`/repository/${a.repo_in_id}`}>{a.repo_in_name}</a>
    },
    {
        dataIndex: "repo_out_name", title: "转出仓库名", key: "repo_out_name",
        render: (_: any, a: any, ___: any) => <a href={`/repository/${a.repo_out_id}`}>{a.repo_out_name}</a>
    },
];