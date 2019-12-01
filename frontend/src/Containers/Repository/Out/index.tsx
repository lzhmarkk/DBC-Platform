import React, {ReactNode, useEffect, useState} from 'react'
import ISearchPanel from "../../../Components/SearchPanel";
import styles from "../index.module.scss"
import {Table, Button, Modal, Drawer, message} from 'antd';
import {useDispatch} from "react-redux";
import GenColumns from "../../../Components/Repository/out";
import outApiData from "../../../Assets/mockingApiData/Repository/out";
import INewRepoOutPanel, {IFormPayload} from "../../../Components/Repository/out/form";
import Axios from "axios";
import {APIList} from "../../../API";

const PageRepositoryOut = () => {

    const dispatch = useDispatch();
    const [apiData, setApiData] = useState(outApiData);
    const [listData, setListData] = useState(apiData.RepoMessOut);
    const [modelOpen, setModelOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [curRepoMess, setCurRepoMess] = useState(undefined);
    const Action = (props: { record: any }) => <div className={styles.hbox}>
        <Button onClick={() => {
            setCurRepoMess(props.record);
            setModelOpen(true);
        }}
                icon={'search'}
                type={'primary'}
        >修改转出状态</Button>
    </div>;

    const handlePost = (prop: any) => {
        Axios.post(APIList.repoOut, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("出库信息新建失败"));
        update();
    };
    const columns = GenColumns(Action);

    const update = () => {
        Axios.get(APIList.repoOut)
            .then(res => {
                setApiData(res.data);
                setListData(res.data.RepoMessOut);
            })
            .catch(() => message.error("出库信息获取失败"))
    };
    useEffect(update, []);
    return (
        <div>
            <div className={styles.ControlPanel}>
                <ISearchPanel
                    field={{
                        "repo_mess_id": "转出编号",
                        "repo_mess_info": "转出详情",
                        "repo_name": "仓库名",
                        "prod_name": "产品名",
                        "order_id": "订单号",
                    }}
                    onSearch={(e) => !e.content ? setListData(listData) :
                        setListData(listData.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
                    onClear={() => setListData(listData)}
                />
                <Button icon={"plus-circle"} type={"primary"} onClick={() => setDrawerOpen(true)}>新增转出</Button>
            </div>
            <Table
                columns={columns}
                dataSource={listData}
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
            <Drawer title={"新建转出记录"}
                    width={720}
                    onClose={() => setDrawerOpen(false)}
                    visible={drawerOpen}>
                <INewRepoOutPanel prods={apiData.Prod.map(e => ({"key": e.prod_id, "value": e.prod_name}))}
                                  repos={apiData.Repo.map(e => ({"key": e.repo_id, "value": e.repo_name}))}
                                  orders={apiData.Order.map(e => ({"key": e.order_id, "value": e.order_id}))}
                                  onSubmit={(e: IFormPayload) => {
                                      setDrawerOpen(false);
                                      const newRepoMess = {
                                          "type": "NEW_MESS_OUT",
                                          "data": {
                                              "repo_mess_info": e.repo_mess_info,
                                              "prod_id": e.prod_id,
                                              "quantity": e.quantity,
                                              "repo_id": e.prod_id,
                                              "order_id": e.order_id
                                          }
                                      };
                                      console.log("表单数据");
                                      console.log(newRepoMess);
                                      handlePost(newRepoMess);
                                  }}/>
            </Drawer>
        </div>
    )
};
export default PageRepositoryOut;