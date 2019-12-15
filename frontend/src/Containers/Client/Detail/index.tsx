import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import IEditClientModel, {IEditClientFormPayload} from "../../../Components/Client/form";
import Axios from "axios";
import {APIList} from "../../../API";
import {Button, Card, Col, Descriptions, message, Row, Spin, Table} from "antd";
import clientDetailApiData from "../../../Assets/mockingApiData/Client/detail";
import {GenOrderColumns} from "../../../Components/Client";
import {getButton} from "../../../Components/Order";
import styles from './index.module.scss'
import ISearchPanel from "../../../Components/SearchPanel";

const PageClientDetail = withRouter((props: any) => {
    const id = props.match.params.id;
    const [modelOpen, setModelOpen] = useState(false);
    const [apiData, setApiData] = useState(clientDetailApiData);
    const [listData, setListData] = useState(clientDetailApiData.Order);
    const [loading, setLoading] = useState(true);

    const update = () => {
        setLoading(true);
        Axios.get(APIList.clientDetail(id), {withCredentials: true})
            .then(res => {
                setApiData(res.data);
                setListData(res.data.Order);
                console.log("客户详细信息", res.data);
                setLoading(false);
            })
            .catch(() => message.error("客户详细信息获取失败"))
    };
    useEffect(update, []);

    const handlePut = (prop: any) => {
        Axios.put(APIList.client, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
                update();
            })
            .catch(() => message.error("客户信息修改失败"));
    };
    const Action = (props: { record: any }) =>
        <div className={styles.hbox}>
            {getButton(props, () => window.location.href = `/order/${props.record.order_id}`)}
        </div>;
    const column = GenOrderColumns(Action);
    const content = (
        <div>
            <Row>
                <Button onClick={() => setModelOpen(true)}
                        type={"primary"} className={styles.button}>
                    修改客户信息
                </Button>
                <Col span={8} className={styles.card}>
                    <Card cover={<img src={apiData.cust_icon} alt={"logo"} style={{padding: 5}}/>}
                          style={{background: "rgba(96,96,96,0.29)"}}>
                    </Card>
                </Col>
                <Col span={16} className={styles.card}>
                    <Descriptions title={"客户详细信息"} bordered>
                        <Descriptions.Item label={"姓名"}>{apiData.cust_name}</Descriptions.Item>
                        <Descriptions.Item label={"Email"} span={2}>{apiData.cust_email}</Descriptions.Item>
                        <Descriptions.Item label={"手机号"}>{apiData.cust_phone}</Descriptions.Item>
                        <Descriptions.Item label={"公司"} span={2}>{apiData.cust_co}</Descriptions.Item>
                        <Descriptions.Item label={"地址"} span={3}>{apiData.cust_address}</Descriptions.Item>
                        <Descriptions.Item label={"微信"}>{apiData.cust_wechat}</Descriptions.Item>
                        <Descriptions.Item label={"QQ"}>{apiData.cust_qq}</Descriptions.Item>
                        <Descriptions.Item label={"职位"}>{apiData.cust_duty}</Descriptions.Item>
                        <Descriptions.Item label={"经营范围"}>{apiData.cust_business_scope}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            <div className={styles.ControlPanel}>
                <ISearchPanel
                    field={{
                        "order_id": "订单编号",
                        "order_info": "订单内容",
                        "order_date": "订单时间"
                    }}
                    onSearch={(e) => !e.content ? setListData(apiData.Order) :
                        setListData(apiData.Order.filter((k: any) => (k[e.field] as string).indexOf(e.content) !== -1))}
                    onClear={() => setListData(apiData.Order)}
                />
            </div>
            <Table columns={column}
                   dataSource={listData}
                   rowKey={listData => listData.order_id}
            />
            <IEditClientModel setModelOpen={setModelOpen}
                              modelOpen={modelOpen}
                              customer={apiData}
                              onSubmit={(e: IEditClientFormPayload) => {
                                  setModelOpen(false);
                                  const editClient = {
                                      "type": "EDIT_CUST",
                                      "data": {
                                          "cust_id": e.cust_id,
                                          "cust_name": e.cust_name,
                                          "cust_email": e.cust_email,
                                          "cust_co": e.cust_co,
                                          "cust_address": e.cust_address,
                                          "cust_phone": e.cust_phone,
                                          "cust_icon": e.cust_icon == undefined ? undefined : e.cust_icon[0].thumbUrl,
                                          "cust_wechat": e.cust_wechat,
                                          "cust_qq": e.cust_qq,
                                          "cust_duty": e.cust_duty,
                                          "cust_business_scope": e.cust_business_scope
                                      }
                                  };
                                  console.log("修改表单数据");
                                  console.log(editClient);
                                  handlePut(editClient);
                              }}/>
        </div>
    );
    return loading ? <Spin/> : content;
});

export default PageClientDetail;
