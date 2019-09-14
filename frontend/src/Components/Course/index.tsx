import React from "react";

export interface ICourseRecord {
    Id: string
    Name: string
    Time: string
    Person: string
    Capacity: string
    Score: string
    Type: string
}
const GenColumns = (Action: (props: { record: any }) => JSX.Element) => [
    {
        dataIndex: "Id", title: "课程编号", key: "Id",
        sorter: (a: ICourseRecord, b: ICourseRecord) => parseInt(a.Id) - parseInt(b.Id),
    },
    {dataIndex: "Name", title: "课程名称", key: "Name"},
    {dataIndex: "Time", title: "上课时间", key: "Time"},
    {dataIndex: "Person", title: "已选人数", key: "Person"},
    {dataIndex: "Capacity", title: "课程容量", key: "Capacity"},
    {
        dataIndex: "Score", title: "学分", key: "Score",
        sorter: (a: ICourseRecord, b: ICourseRecord) => parseInt(a.Score) - parseInt(b.Score)
    },
    {dataIndex: "Type", title: "课程类型", key: "Type"},
    {
        dataIndex: "Action", title: "操作", key: "Action",
        render: (_: any, record: any, ___: any) => <Action record={record}/>
    },
];
export default GenColumns;