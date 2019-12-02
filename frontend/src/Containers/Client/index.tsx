import React, {useEffect, useState} from 'react'
import ISearchPanel from "../../Components/SearchPanel";
import styles from "./index.module.scss"
import {Table, Button, Modal, Drawer, message, Card} from 'antd';
import Axios from "axios";
import {APIList} from "../../API";
import clientApiData from "../../Assets/mockingApiData/Client/client";
import {IEditClientFormPayload} from "../../Components/Client/form";
import {INewClientFormPayload} from "../../Components/Client/form/newClientForm";
import GenColumns, {getButton} from "../../Components/Client";
import IEditClientModel from "../../Components/Client/form";
import INewClientForm from "../../Components/Client/form/newClientForm";
import ReactEcharts from "echarts-for-react";
import {getGraph} from "../../Components/Dashboard";

const PageClient = () => {
    const [apiData, setApiData] = useState(clientApiData);
    const [listData, setListData] = useState(clientApiData.Cust);

    const [curClient, setCurClient] = useState(undefined);
    const [modelOpen, setModelOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const update = () => {
        Axios.get(APIList.client, {withCredentials: true})
            .then(res => {
                setApiData(res.data);
                setListData(res.data.Order);
            })
            .catch(() => message.error("客户信息获取失败"))
    };
    useEffect(update, []);

    const handlePost = (prop: any) => {
        Axios.post(APIList.client, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("客户信息新建失败"));
        update();
    };
    const handlePut = (prop: any) => {
        Axios.put(APIList.client, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("客户信息修改失败"));
        update();
    };

    const Action = (props: { record: any }) => <div className={styles.hbox}>
        {getButton(props, () => {
            setCurClient(props.record);
            setModelOpen(true);
        })}
    </div>;
    const genGraph = () => {
        const name = apiData.Graph.map(e => e.cust_name);
        const orders = apiData.Graph.map(e => e.cust_orders);
        return (
            <ReactEcharts option={getGraph(name, orders)}/>
        )
    };
    const columns = GenColumns(Action);
    return (
        <div>
            <div style={{paddingBottom: "60px"}}>
                <Card title={"合作伙伴"} type={"inner"}>
                    {genGraph()}
                </Card>
            </div>
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
                rowKey={listData => listData.cust_id}
            />
            <IEditClientModel setCurClient={setCurClient}
                              setModelOpen={setModelOpen}
                              modelOpen={modelOpen}
                              onSubmit={(e: IEditClientFormPayload) => {
                                  setDrawerOpen(false);
                                  const editClient = {
                                      "type": "EDIT_CUST",
                                      "data": {
                                          "cust_id": e.cust_id,
                                          "cust_name": e.cust_name,
                                          "cust_email": e.cust_email,
                                          "cust_co": e.cust_co,
                                          "cust_address": e.cust_address,
                                          "cust_phone": e.cust_phone
                                      }
                                  };
                                  console.log("修改表单数据");
                                  console.log(editClient);
                                  handlePut(editClient);
                              }}
                              customer={curClient}
            />
            <INewClientForm
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onSubmit={(e: INewClientFormPayload) => {
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
export default PageClient;