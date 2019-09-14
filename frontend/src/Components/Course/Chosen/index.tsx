import React, {ReactNode, useState} from 'react'
import ISearchPanel from "../../SearchPanel";
import styles from "../index.module.scss"
import {Table, Button, Modal} from 'antd';
import mockingCourses from "./MockingChosenCourses";
import {useDispatch} from "react-redux";
import GenColumns, {ICourseRecord} from "../index";

const PageChosen = () => {
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
        }} type={'danger'}
        >退课</Button>
    </div>;
    const columns = GenColumns(Action);
    return (
        <div>
            <strong><h1>我的已选课程</h1></strong>
            <Table
                columns={columns}
                dataSource={data}
            />
            <Modal title="确认退课"
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
                    是否确认退课
                    <strong> {currentCourseName}</strong>
                </span>
            </Modal>
        </div>
    )
};
export default PageChosen;