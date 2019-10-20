import React from 'react'
import {Form, Input, Button, Select, DatePicker, Radio} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {genButtons, genFormButtons, orderStates} from "../index";

export interface IFormPayload {
    order_date: string
    cust_id: string
    state: string
    order_info: string
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    customer: { key: string, value: string }[],
}

const form = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value:any) => {
            if (err)
                return;
            value = {...value, "order_date": value.date.format("YYYYMMDD")};
            props.onSubmit(value);
        })
    };
    const {getFieldDecorator} = props.form;
    const custOptions = props.customer.map(e => <Select key={e.key} value={e.key}>{e.value}</Select>);
    return (
        <Form
            style={{background: "white"}}>
            <Form.Item label="订单详情">
                {getFieldDecorator('order_info', {
                    rules: [{type: "string", required: true, message: "请输入文字描述"}],
                })(<Input placeholder={"请输入文字描述"}/>)}
            </Form.Item>
            <Form.Item label="客户">
                {getFieldDecorator('cust_id', {
                    rules: [{type: "string", required: true, message: "请选择客户"}],
                })(<Select placeholder={"请选择客户"} style={{minWidth: "160px"}}>
                    {custOptions}
                </Select>)}
            </Form.Item>
            <Form.Item label="订单日期">
                {getFieldDecorator('date', {
                    rules: [{type: 'object', required: true, message: '请选择日期'}],
                })(<DatePicker placeholder={"请选择日期"}/>)}
            </Form.Item>
            <Form.Item label="订单状态">
                {getFieldDecorator('state')
                (genFormButtons)}
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} icon={"plus-circle"} type={"primary"}>新增订单</Button>
            </Form.Item>
        </Form>
    )
};

const INewOrderPanel = Form.create<IFormProps>()(form);

export default INewOrderPanel;