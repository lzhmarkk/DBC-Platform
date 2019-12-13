import React, {useState} from 'react'
import {Form, Input, Button, Select, DatePicker, Col, Radio, Row, Icon, InputNumber, Card} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {orderStates} from "../index";
import moment from 'moment';

export interface IFormPayload {
    order_date: string,
    cust_id: string,
    state: string,
    order_info: string,
    order_amount: string,
    order_payee: string,
    order_payer: string,
    order_pay_type: string,
    order_serial: string,
    order_payee_card: string,
    order_payee_bank: string,
    order_payer_card: string,
    order_payer_bank: string,
    order_tex: string,
    order_description: string,
    Prod: {
        prod_name: string, prod_desc: string, prod_unit: string,
        prod_price: string, quantity: string
    }[]
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    customer: { key: string, value: string }[],
    init: any,
}

const {TextArea} = Input;
const {Option} = Select;
const IOrderForm = (props: IFormProps) => {
    const onNew = !props.init;
    const state = onNew ? "1" : props.init.state;
    const [keys, setKeys] = useState<number[]>(onNew ? [1] :
        props.init.Prod.map((_: any, index: number) => index + 1));
    const [id, setId] = useState(keys.length + 1);

    const [payInfo, setPayInfo] = useState(onNew ? false : props.init.order_pay_type == "transfer");

    const IFormat = (value: any) => {
        let Prod: {
            prod_name: string, prod_desc: string, prod_unit: string,
            prod_price: string, quantity: string
        }[] = [];
        keys.map(k => Prod = Prod.concat({
            "prod_name": value[`prod_name${k}`],
            "prod_desc": value[`prod_desc${k}`],
            "prod_unit": value[`prod_unit${k}`],
            "prod_price": value[`prod_price${k}`],
            "quantity": value[`quantity${k}`],
        }));
        return {...value, "Prod": Prod, "order_date": value.order_date.format("YYYY-MM-DD")};
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: any) => {
            if (err)
                return;
            props.onSubmit(IFormat(value));
        })
    };
    const {getFieldDecorator} = props.form;
    const custOptions = props.customer.map(e => <Option key={e.key} value={e.key}>{e.value}</Option>);

    const remove = (k: number) => {
        if (keys.length == 1) {
            return;
        }
        setKeys(keys.filter(key => key != k));
    };
    const add = () => {
        setKeys(keys.concat(id));
        setId(id + 1);
    };
    const prodItems = keys.map((k) => (
        <Card bodyStyle={{padding: "5px"}} key={k}>
            <Row>
                <Col span={8}>
                    <Form.Item label={`产品${k}`} style={{marginBottom: "0px"}}>
                        {getFieldDecorator(`prod_name${k}`, {
                            rules: [{required: true, message: "请输入产品名"}],
                            initialValue: onNew ? undefined : props.init.Prod[k - 1].prod_name
                        })(<Input placeholder={`产品${k}`} disabled={state != "1"}/>)}
                    </Form.Item>
                </Col>
                <Col span={6} style={{paddingLeft: "50px", paddingRight: "50px"}}>
                    <Form.Item label={`单位`} style={{marginBottom: "0px"}}>
                        {getFieldDecorator(`prod_unit${k}`, {
                            rules: [{required: true, message: "请输入单位"}],
                            initialValue: onNew ? undefined : props.init.Prod[k - 1].prod_unit
                        })(<Input placeholder={`单位`} disabled={state != "1"}/>)}
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={`单价`} style={{marginBottom: "0px"}}>
                        {getFieldDecorator(`prod_price${k}`, {
                            rules: [{pattern: /^\d+$/, required: true, message: "请输入单价"}],
                            initialValue: onNew ? undefined : props.init.Prod[k - 1].prod_price
                        })(<Input placeholder={`单价`} style={{width: "80%"}} disabled={state != "1"}/>)}
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={`数量`} style={{marginBottom: "0px"}}>
                        {getFieldDecorator(`quantity${k}`, {
                            rules: [{pattern: /^\d+$/, required: true, message: "请输入数量"}],
                            initialValue: onNew ? undefined : props.init.Prod[k - 1].quantity
                        })(<Input placeholder={`数量`} style={{width: "80%"}} disabled={state != "1"}/>)}
                    </Form.Item>
                </Col>
                <Col span={1}>
                    <Form.Item>
                        {keys.length > 1 ?
                            <Button shape="circle" size={"small"} icon="close" onClick={() => remove(k)}
                                    disabled={state != "1"}/> : null}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item label={`描述`} style={{marginBottom: "0px"}}>
                    {getFieldDecorator(`prod_desc${k}`, {
                        rules: [{required: true, message: "请输入描述"}],
                        initialValue: onNew ? undefined : props.init.Prod[k - 1].prod_desc
                    })(<Input placeholder={`描述`} disabled={state != "1"}/>)}
                </Form.Item>
            </Row>
        </Card>
    ));
    return (
        <Form
            style={{background: "white"}}>
            <Form.Item label="订单详情" hasFeedback>
                {getFieldDecorator('order_info', {
                    rules: [{type: "string", required: true, message: "请输入文字描述"}],
                    initialValue: onNew ? undefined : props.init.order_info
                })(<Input placeholder={"请输入文字描述"} disabled={state != "1"}/>)}
            </Form.Item>
            <Row>
                <Col span={12}>
                    <Form.Item label="客户" hasFeedback>
                        {getFieldDecorator('cust_id', {
                            rules: [{required: true, message: "请选择客户"}],
                            initialValue: onNew ? undefined : props.init.cust_id
                        })(<Select placeholder={"请选择客户"} style={{minWidth: "160px"}} disabled={state != "1"}>
                            {custOptions}
                        </Select>)}
                    </Form.Item>
                </Col>
                <Col span={12} style={{paddingLeft: "50px"}}>
                    <Form.Item label="订单日期">
                        {getFieldDecorator('order_date', {
                            rules: [{type: 'object', required: true, message: '请选择日期'}],
                            initialValue: onNew ? undefined : moment(props.init.order_date)
                        })(<DatePicker placeholder={"请选择日期"} disabled={state != "1"}/>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={14}>
                    <Form.Item label="订单状态">
                        {getFieldDecorator('state')
                        (
                            <Radio.Group>
                                <Radio.Button value="1"
                                              disabled={parseInt(state) > 1}>{orderStates["1"]}</Radio.Button>
                                <Radio.Button value="2"
                                              disabled={parseInt(state) > 2}>{orderStates["2"]}</Radio.Button>
                                <Radio.Button value="3"
                                              disabled={parseInt(state) > 3}>{orderStates["3"]}</Radio.Button>
                                <Radio.Button value="4"
                                              disabled={parseInt(state) > 4}>{orderStates["4"]}</Radio.Button>
                                <Radio.Button value="5"
                                              disabled={parseInt(state) > 5}>{orderStates["5"]}</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Col>
                <Col span={10} style={{paddingLeft: "0px"}}>
                    <Form.Item label="订单金额">
                        {getFieldDecorator('order_amount', {
                            rules: [{pattern: /^\d+$/, required: true, message: "请输入数字"}],
                            initialValue: onNew ? undefined : props.init.order_amount
                        })(<Input prefix="￥" suffix="RMB" placeholder={"请输入订单金额"} disabled={state != "1"}/>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="收款人" style={{width: "80%"}} hasFeedback>
                        {getFieldDecorator('order_payee', {
                            rules: [{type: "string", required: true, message: "请输入收款人姓名"}],
                            initialValue: onNew ? undefined : props.init.order_payee
                        })(<Input placeholder={"请输入收款人姓名"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="付款人" style={{width: "80%"}} hasFeedback>
                        {getFieldDecorator('order_payer', {
                            rules: [{type: "string", required: true, message: "请输入付款人姓名"}],
                            initialValue: onNew ? undefined : props.init.order_payer
                        })(<Input placeholder={"请输入付款人姓名"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="付款方式" style={{width: "40%"}}>
                {getFieldDecorator('order_pay_type', {
                    initialValue: onNew ? "cash" : props.init.order_pay_type
                })(
                    <Select onChange={(e: string) => {
                        setPayInfo(e == "transfer");
                    }} disabled={parseInt(state) > 2}>
                        <Option key="cash" value="cash">现金</Option>
                        <Option key="wechat" value="wechat">微信</Option>
                        <Option key="alipay" value="alipay">支付宝</Option>
                        <Option key="transfer" value="transfer">银行转账</Option>
                    </Select>
                )}
            </Form.Item>

            {payInfo ?
                <div>
                    <Form.Item label="转账流水号" hasFeedback>
                        {getFieldDecorator('order_serial', {
                            rules: [{pattern: /^\d+$/, required: true, message: "请输入转账流水号"}],
                            initialValue: onNew ? undefined : props.init.order_serial
                        })(<Input placeholder={"请输入转账流水号"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                    <Form.Item label="收款账户" hasFeedback>
                        {getFieldDecorator('order_payee_card', {
                            rules: [{pattern: /^\d{16,19}$/, required: true, message: "请输入合法的银行卡帐号"}],
                            initialValue: onNew ? undefined : props.init.order_payee_card
                        })(<Input placeholder={"请输入收款账户"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                    <Form.Item label="收款银行" hasFeedback>
                        {getFieldDecorator('order_payee_bank', {
                            rules: [{required: true, message: "请输入收款银行"}],
                            initialValue: onNew ? undefined : props.init.order_payee_bank
                        })(<Input placeholder={"请输入收款银行"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                    <Form.Item label="付款账户" hasFeedback>
                        {getFieldDecorator('order_payer_card', {
                            rules: [{pattern: /^\d{16,19}$/, required: true, message: "请输入合法的银行卡帐号"}],
                            initialValue: onNew ? undefined : props.init.order_payer_card
                        })(<Input placeholder={"请输入付款账户"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                    <Form.Item label="付款银行" hasFeedback>
                        {getFieldDecorator('order_payer_bank', {
                            rules: [{required: true, message: "请输入付款银行"}],
                            initialValue: onNew ? undefined : props.init.order_payer_bank
                        })(<Input placeholder={"请输入付款银行"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                    <Form.Item label="税" style={{width: "40%"}} hasFeedback>
                        {getFieldDecorator('order_tex', {
                            rules: [{pattern: /^\d+$/, required: true, message: "请输入税额"},],
                            initialValue: onNew ? 0 : props.init.order_tex
                        })(<Input placeholder={"请输入税额"} disabled={parseInt(state) > 2}/>)}
                    </Form.Item>
                </div>
                :
                <React.Fragment> </React.Fragment>
            }
            <Form.Item>
                <Button type="primary" onClick={add} style={{width: '60%'}} disabled={state != "1"}>
                    <Icon type="plus"/>添加产品
                </Button>
            </Form.Item>
            {prodItems}
            <Form.Item label="备注">
                {getFieldDecorator('order_description', {
                    initialValue: onNew ? undefined : props.init.order_description
                })
                (<TextArea placeholder={"请输入订单备注"} disabled={parseInt(state) > 4}/>)}
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} icon={"plus-circle"}
                        type={"primary"}>{onNew ? "新增订单" : "修改订单"}</Button>
            </Form.Item>
        </Form>
    )
};

const IOrderPanel = Form.create<IFormProps>()(IOrderForm);

export default IOrderPanel;