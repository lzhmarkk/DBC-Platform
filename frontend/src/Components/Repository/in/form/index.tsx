import React from 'react'
import {Form, Input, Button, Select} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

export interface IFormPayload {
    repo_mess_info: string
    prod_id: string
    quantity: string
    repo_id: string
    order_id: string
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    prods: { key: string, value: string }[],
    repos: { key: string, value: string }[],
    orders: { key: string, value: string }[],
}


const form = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: IFormPayload) => {
            if (err)
                return;
            props.onSubmit(value);
        })
    };
    const {getFieldDecorator} = props.form;
    const prodOptions = props.prods.map(e => <Select key={e.key} value={e.key}>{e.value}</Select>);
    const repoOptions = props.repos.map(e => <Select key={e.key} value={e.key}>{e.value}</Select>);
    const orderOptions = props.orders.map(e => <Select key={e.key} value={e.key}>{e.value}</Select>);
    return (
        <Form
              style={{background: "white"}}>
            <Form.Item label="转入详情">
                {getFieldDecorator('repo_mess_info', {
                    rules: [{type: "string", required: true, message: "请输入文字描述"}],
                })(<Input placeholder={"请输入转入"}/>)}
            </Form.Item>
            <Form.Item label="产品类型">
                {getFieldDecorator('prod_id', {
                    rules: [{type: "string", required: true, message: "请选择相关产品"}],
                })(<Select style={{minWidth: "160px"}}>
                    {prodOptions}
                </Select>)}
            </Form.Item>
            <Form.Item label="数量">
                {getFieldDecorator('quantity', {
                    rules: [{type: "string", required: true, message: "请输入转入数量"}],
                })(<Input placeholder={"请输入数量"}/>)}
            </Form.Item>
            <Form.Item label="仓库">
                {getFieldDecorator('repo_id', {
                    rules: [{type: "string", required: true, message: "请选择仓库"}],
                })(<Select style={{minWidth: "160px"}}>
                    {repoOptions}
                </Select>)}
            </Form.Item>
            <Form.Item label="订单">
                {getFieldDecorator('order_id', {
                    rules: [{type: "string", required: true, message: "请选择订单"}],
                })(<Select>
                    {orderOptions}
                </Select>)}
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} icon={"plus-circle"} type={"primary"}>新建转入记录</Button>
            </Form.Item>
        </Form>
    )
};

const INewRepoInPanel = Form.create<IFormProps>()(form);

export default INewRepoInPanel;