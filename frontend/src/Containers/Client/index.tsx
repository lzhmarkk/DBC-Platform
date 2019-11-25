import React, {useEffect, useState} from 'react'
import ISearchPanel from "../../Components/SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, Modal, Drawer, message} from 'antd';
import Axios from "axios";
import {APIList} from "../../API";
import clientApiData from "../../Assets/mockingApiData/client";
import IEditClientPanel, {IFormPayload} from "../../Components/Client/form";
import {genButtons} from "../../Components/Order";
import GenColumns, {getButton} from "../../Components/Client";
import IEditClientModel from "../../Components/Client/form";
import INewClientForm from "../../Components/Client/form/newClientForm";
import {withAuth} from "../../Components/Common/AuthWrapper";

const Page = () => {
    const [apiData, setApiData] = useState(clientApiData);
    const [listData, setListData] = useState(clientApiData.Cust);

    const [curClient, setCurClient] = useState(undefined);
    const [modelOpen, setModelOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        Axios.get(APIList.client)
            .then(res => {
                console.log("api的返回值：");
                console.log(res);
                console.log("返回值结束");
                setApiData(res.data);
                setListData(res.data.Order);
            })
            .catch(() => message.error("网络错误现在显示的是前端的硬编码数据\n建议查看控制台"))
    }, []);

    const handlePost = (prop: any) => {
        console.log("开始post");
        Axios.post(APIList.client, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("获取post的后台返回结果失败"));
        console.log("post完成");
    };

    const Action = (props: { record: any }) => <div className={styles.hbox}>
        {getButton(props, () => {
            setCurClient(props.record);
            setModelOpen(true);
        })}
    </div>;
    const columns = GenColumns(Action);
    return (
        <div>
            <div className={styles.ControlPanel}>
                <ISearchPanel
                    field={{
                        "cust_id": "客户编号",
                        "cust_name": "客户名",
                        "cust_email": "客户邮箱",
                        "cust_co": "公司名",
                        "cust_address": "公司地址",
                        "cust_phone": "客户电话"
                    }}
                    onSearch={(e) => !e.content ? setListData(apiData.Cust) :
                        setListData(apiData.Cust.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
                    onClear={() => setListData(apiData.Cust)}
                />
                <Button icon={"plus-circle"} type={"primary"} onClick={() => setDrawerOpen(true)}>新增客户</Button>
            </div>
            <Table
                columns={columns}
                dataSource={listData}
            />
            <IEditClientModel setCurClient={setCurClient}
                              setModelOpen={setModelOpen}
                              modelOpen={modelOpen}
                              onSubmit={(e: IFormPayload) => {
                                  setDrawerOpen(false);
                                  const editClient = {
                                      "type": "EDIT_CUST",
                                      "data": {
                                          "cust_name": e.cust_name,
                                          "cust_email": e.cust_email,
                                          "cust_co": e.cust_co,
                                          "cust_address": e.cust_address,
                                          "cust_phone": e.cust_phone
                                      }
                                  };
                                  console.log("修改表单数据");
                                  console.log(editClient);
                                  handlePost(editClient);
                              }}
                              customer={curClient}
            />
            <INewClientForm
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onSubmit={(e: IFormPayload) => {
                    setDrawerOpen(false);
                    const newClient = {
                        "type": "NEW_CUST",
                        "data": {
                            "cust_name": e.cust_name,
                            "cust_email": e.cust_email,
                            "cust_co": e.cust_co,
                            "cust_address": e.cust_address,
                            "cust_phone": e.cust_phone
                        }
                    };
                    console.log("新建表单数据");
                    console.log(newClient);
                    handlePost(newClient);
                }}
            />
        </div>
    )
};

const PageClient = withAuth(Page);
export default PageClient;