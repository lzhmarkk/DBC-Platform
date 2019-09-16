import React, {ReactNode, useState} from 'react'
import ISearchPanel from "../../../Components/SearchPanel";
import styles from "../index.module.scss"
import {Table, Button, Modal} from 'antd';
import mockingRepoMessages from "../../../Assets/mockings/mockingRepoMessages";
import {useDispatch} from "react-redux";
import GenColumns from "../../../Components/Repository/in";

const PageRepositoryIn = () => {
    const mockingData = mockingRepoMessages.filter((k: any) => (k["direction"] as string).indexOf("IN") != -1);
    const dispatch = useDispatch();
    const [data, setData] = useState(mockingData);
    const [windowOpen, setWindowOpen] = useState(false);
    const [curRepoMess, setCurRepoMess] = useState(undefined);
    const [curRepoName, setCurRepoName] = useState(undefined);
    const Action = (props: { record: any }) => <div className={styles.hbox}>
        <Button onClick={() => {
            setCurRepoMess(props.record);
            setWindowOpen(true);
        }}
                icon={'search'}
                type={'primary'}
        >修改转入状态</Button>
    </div>;
    const columns = GenColumns(Action);
    return (
        <div>
            <ISearchPanel
                field={{
                    "repo_mess_id": "转入编号",
                    "repo_mess_info": "转入详情",
                    "repo_id": "仓库号",
                    "prod_id": "产品号",
                    "order_id": "订单号",
                }}
                onSearch={(e) => !e.content ? setData(mockingData) :
                    setData(data.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
            />
            <Table
                columns={columns}
                dataSource={data}
            />
            <Modal title="修改状态"
                   visible={windowOpen}
                   onCancel={() => {
                       setWindowOpen(false);
                       setCurRepoMess(undefined);
                   }}
                   onOk={() => {
                       setWindowOpen(false);
                       setCurRepoMess(undefined);
                   }}
                   okText="确定"
                   cancelText="取消"
            >
                <span>
                    是否选择
                </span>
            </Modal>
        </div>
    )
};
export default PageRepositoryIn;