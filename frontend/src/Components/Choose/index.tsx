import React, {ReactNode, useState} from 'react'
import ISearchPanel from "../SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, Modal} from 'antd';
import mockingCourses from "./MockingCourses";
import {useDispatch} from "react-redux";


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
const PageChoose = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(mockingCourses);
    const [window, setWindowOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(undefined);
    const [currentCourseName, setCurrentCourseName] = useState(undefined);
    const Action = (props: { record: any }) => <div className={styles.hbox}>
        <Button onClick={() => {
            setCurrentCourse(props.record);
            setCurrentCourseName(props.record.valueOf()["Name"]);
            setWindowOpen(true);
        }}
                icon={'search'}
                type={'primary'}
        >选择课程</Button>
    </div>;
    const columns = GenColumns(Action);
    return (
        <div>
            <ISearchPanel
                field={{
                    "Name": "课程名称",
                    "Id": "课程编号"
                }}
                onSearch={(e) => !e.content ? setData(mockingCourses) :
                    setData(data.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
            />
            <Table
                columns={columns}
                dataSource={data}
            />
            <Modal title="确认选择"
                   visible={window}
                   onCancel={() => {
                       setWindowOpen(false);
                       setCurrentCourse(undefined);
                       setCurrentCourseName(undefined);
                   }}
                   onOk={() => {
                       setWindowOpen(false);
                       setCurrentCourse(undefined);
                       setCurrentCourseName(undefined);
                   }}
                   okText="确定"
                   cancelText="取消"
            >
                <span>
                    是否选择
                    <strong> {currentCourseName}</strong>
                </span>
            </Modal>
        </div>
    )
};
export default PageChoose;