import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import Axios from "axios";
import {APIList} from "../../../API";
import {Button, Card, Col, Descriptions, Drawer, Icon, message, Row, Table, Tabs} from "antd";
import orderDetailApiData from "../../../Assets/mockingApiData/Order/detail";
import {genProdColumns, genProdGraph, genRepoMessColumns, genTags} from "../../../Components/Order";
import ReactEcharts from "echarts-for-react";
import styles from "../../Client/Detail/index.module.scss";
import IOrderPanel, {IFormPayload} from "../../../Components/Order/form";

const {TabPane} = Tabs;
const PageOrderDetail = withRouter((prop) => {
    const id = prop.match.params.id;
    const [data, setData] = useState(orderDetailApiData);
    const [prodListData, setProdListData] = useState(orderDetailApiData.Prod);
    const [inListData, setInListData] = useState(orderDetailApiData.RepoMessIn);
    const [outListData, setOutListData] = useState(orderDetailApiData.RepoMessOut);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const update = () => {
        Axios.get(APIList.orderDetail(id), {withCredentials: true})
            .then(res => {
                setData(res.data);
                setProdListData(res.data.Order);
                setInListData(res.data.RepoMessIn);
                setOutListData(res.data.RepoMessOut);
            })
            .catch(() => message.error(`订单${id}详细信息获取失败`))
    };
    const handlePut = (prop: any) => {
        Axios.put(APIList.order, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("订单修改失败"));
        update();
    };
    useEffect(update, []);

    const type = () => {
        const t = data.order_pay_type;
        return t == "cash" ? "现金" : t == "wechat" ? "微信" : t == 'alipay' ? "支付宝" : "银行转账"
    };
    const genGraph = () => {
        const prod_name = prodListData.map(e => e.prod_name);
        const quantity = prodListData.map(e => parseInt(e.quantity));
        return (
            <ReactEcharts option={genProdGraph(prod_name, quantity)}/>
        )
    };

    //Description不给嵌套，没办法只能这样写
    const descLess =
        <Descriptions title={<span><strong>订单详细信息</strong> 状态：{genTags(data.state)}</span>}
                      bordered column={3}>
            <Descriptions.Item label={"订单编号"}>{data.order_id}</Descriptions.Item>
            <Descriptions.Item label={"订单日期"}>{data.order_date}</Descriptions.Item>
            <Descriptions.Item label={"订单总额"}>￥{data.order_amount}元</Descriptions.Item>
            <Descriptions.Item label={"客户姓名"}>
                <a href={`/client/${data.cust_id}`}>{data.cust_name}</a>
            </Descriptions.Item>
            <Descriptions.Item label={"客户公司"} span={2}>{data.cust_co}</Descriptions.Item>
            <Descriptions.Item label={"订单内容"} span={3}>{data.order_info}</Descriptions.Item>
            <Descriptions.Item label={"支付方式"}>{type()}</Descriptions.Item>
            <Descriptions.Item label={"收款人"}>{data.order_payee}</Descriptions.Item>
            <Descriptions.Item label={"付款人"}>{data.order_payer}</Descriptions.Item>
            <Descriptions.Item label={"备注"} span={3}>{data.order_description}</Descriptions.Item>
        </Descriptions>;

    const descMore =
        <Descriptions title={<span><strong>订单详细信息</strong> 状态：{genTags(data.state)}</span>}
                      bordered column={3}>
            <Descriptions.Item label={"订单编号"}>{data.order_id}</Descriptions.Item>
            <Descriptions.Item label={"订单日期"}>{data.order_date}</Descriptions.Item>
            <Descriptions.Item label={"订单总额"}>￥{data.order_amount}元</Descriptions.Item>
            <Descriptions.Item label={"客户姓名"}>
                <a href={`/client/${data.cust_id}`}>{data.cust_name}</a>
            </Descriptions.Item>
            <Descriptions.Item label={"客户公司"} span={2}>{data.cust_co}</Descriptions.Item>
            <Descriptions.Item label={"订单内容"} span={3}>{data.order_info}</Descriptions.Item>
            <Descriptions.Item label={"支付方式"}>{type()}</Descriptions.Item>
            <Descriptions.Item label={"收款人"}>{data.order_payee}</Descriptions.Item>
            <Descriptions.Item label={"付款人"}>{data.order_payer}</Descriptions.Item>
            <Descriptions.Item label={"收款账户"} span={2}>{data.order_payee_card}</Descriptions.Item>
            <Descriptions.Item label={"收款银行"}>{data.order_payee_bank}</Descriptions.Item>
            <Descriptions.Item label={"付款账户"} span={2}>{data.order_payer_card}</Descriptions.Item>
            <Descriptions.Item label={"付款银行"}>{data.order_payer_bank}</Descriptions.Item>
            <Descriptions.Item label={"转账流水号"} span={2}>{data.order_serial}</Descriptions.Item>
            <Descriptions.Item label={"税"}>{data.order_tex}</Descriptions.Item>
            <Descriptions.Item label={"备注"} span={3}>{data.order_description}</Descriptions.Item>
        </Descriptions>;
    return (
        <div>
            <Button onClick={() => setDrawerOpen(true)}
                    type={"primary"} className={styles.button}>
                修改订单信息
            </Button>
            {
                data.order_pay_type == "transfer" ?
                    descMore : descLess
            }
            <Row style={{padding: "30px"}}>
                <Col span={12}>
                    <Card>
                        <Table pagination={false}
                               bordered
                               columns={genProdColumns()}
                               dataSource={prodListData}
                               rowKey={listData => listData.prod_id}/>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        {genGraph()}
                    </Card>
                </Col>
            </Row>
            <div style={{padding: "30px"}}>
                <Tabs type={"card"}>
                    <TabPane tab={<span><Icon type={"menu-unfold"}/>入库</span>} key={"1"}>
                        <Table columns={genRepoMessColumns("IN")}
                               dataSource={inListData}
                               rowKey={inListData => inListData.repo_mess_id}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type={"menu-fold"}/>出库</span>} key={"2"}>
                        <Table columns={genRepoMessColumns("OUT")}
                               dataSource={outListData}
                               rowKey={outListData => outListData.repo_mess_id}/>
                    </TabPane>
                </Tabs>
            </div>

            <Drawer title={"修改订单"}
                    width={720}
                    onClose={() => setDrawerOpen(false)}
                    visible={drawerOpen}>
                <IOrderPanel init={data}
                             customer={new Array({
                                 "key": data.cust_id,
                                 "value": data.cust_name + " ( " + data.cust_co + " )"
                             })}
                             onSubmit={(e: IFormPayload) => {
                                 setDrawerOpen(false);
                                 const editOrder = {
                                     "type": "EDIT_ORDER",
                                     "data": {
                                         "order_id": id,
                                         "cust_id": e.cust_id,
                                         "order_info": e.order_info,
                                         "order_date": e.order_date,
                                         "state": e.state,
                                         "order_amount": e.order_amount,
                                         "order_payee": e.order_payee,
                                         "order_payer": e.order_payer,
                                         "order_pay_type": e.order_pay_type,
                                         "order_serial": e.order_serial,
                                         "order_payee_card": e.order_payee_card,
                                         "order_payee_bank": e.order_payee_bank,
                                         "order_tex": e.order_tex,
                                         "order_payer_card": e.order_payer_card,
                                         "order_payer_bank": e.order_payer_bank,
                                         "order_description": e.order_description,
                                         "Prod": e.Prod
                                     }
                                 };
                                 console.log("订单修改", editOrder);
                                 handlePut(editOrder);
                             }}/>
            </Drawer>
        </div>
    );
});
export default PageOrderDetail