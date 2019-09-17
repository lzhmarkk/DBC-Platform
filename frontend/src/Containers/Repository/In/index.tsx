import React, {ReactNode, useState} from 'react'
import ISearchPanel from "../../../Components/SearchPanel";
import INewRepoInPanel, {IFormPayload} from "../../../Components/Repository/in/form";
import styles from "../index.module.scss"
import {Table, Button, Modal, Drawer} from 'antd';
import {useDispatch} from "react-redux";
import GenColumns, {id2Name} from "../../../Components/Repository/in";
import {IRepositoryMessRecord} from "../../../Components/Repository/interface";
import {repoMessIn, repoMessOut, prods, repos, orders} from "../index";


const PageRepositoryIn = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(repoMessIn);
    const [modelOpen, setModelOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [curRepoMess, setCurRepoMess] = useState(undefined);
    const [curRepoName, setCurRepoName] = useState(undefined);

    const refinedData = (data: IRepositoryMessRecord[]) => {
        return data.map(e => ({
            ...e,
            "repo_name": id2Name(e.repo_id, repos, "repo_id", "name"),
            "prod_name": id2Name(e.prod_id, prods, "prod_id", "prod_name")
        }))
    };

    const Action = (props: { record: any }) => <div className={styles.hbox}>
        <Button icon={'search'}
                type={'primary'}
                onClick={() => {
                    setCurRepoMess(props.record);
                    setModelOpen(true);
                }}>
            修改转入状态
        </Button>
    </div>;

    const columns = GenColumns(Action);
    return (
        <div>
            <div className={styles.ControlPanel}>
                <ISearchPanel
                    field={{
                        "repo_mess_id": "转入编号",
                        "repo_mess_info": "转入详情",
                        "repo_id": "仓库号",
                        "prod_id": "产品号",
                        "order_id": "订单号",
                    }}
                    onSearch={(e) => !e.content ? setData(repoMessIn) :
                        setData(data.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
                />
                <Button icon={"plus-circle"} type={"primary"} onClick={() => setDrawerOpen(true)}>新增转入</Button>
            </div>
            <Table
                columns={columns}
                dataSource={refinedData(data)}
            />

            <Modal title="修改状态"
                   visible={modelOpen}
                   onCancel={() => {
                       setModelOpen(false);
                       setCurRepoMess(undefined);
                   }}
                   onOk={() => {
                       setModelOpen(false);
                       setCurRepoMess(undefined);
                   }}
                   okText="确定"
                   cancelText="取消"
            >
                <span>
                    是否选择
                </span>
            </Modal>
            <Drawer title={"新建转入记录"}
                    width={720}
                    onClose={() => setDrawerOpen(false)}
                    visible={drawerOpen}>
                <INewRepoInPanel prods={prods.map(e => ({"key": e.prod_id, "value": e.prod_name}))}
                                 repos={repos.map(e => ({"key": e.repo_id, "value": e.name}))}
                                 orders={orders.map(e => ({"key": e.order_id, "value": e.order_id}))}
                                 onSubmit={(e: IFormPayload) => {
                                     setDrawerOpen(false);
                                     const newRepoMess = {
                                         "repo_mess_id": "1",
                                         "repo_mess_info": e.repo_mess_info,
                                         "repo_id": e.repo_id,
                                         "direction": "IN",
                                         "quantity": e.quantity,
                                         "prod_id": e.prod_id,
                                         "order_id": e.order_id
                                     };
                                     setData(data.concat(newRepoMess));
                                 }}/>
            </Drawer>
        </div>
    )
};
export default PageRepositoryIn;