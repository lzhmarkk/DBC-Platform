import React from 'react'
import {Button, Drawer, Form, Input} from "antd";
import {FormComponentProps} from "antd/lib/form";

export interface IFormPayload {
    cust_name: string,
    cust_email: string,
    cust_co: string,
    cust_address: string,
    cust_phone: string
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    setDrawerOpen: (a: boolean) => void,
    drawerOpen: boolean
}

const INewForm = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: any) => {
            if (err)
                return;
            props.onSubmit(value);
        })
    };
    const {getFieldDecorator} = props.form;
    return (
        <Drawer title={"新增客户"}
                width={720}
                onClose={() => props.setDrawerOpen(false)}
                visible={props.drawerOpen}>
            <Form
                style={{background: "white"}}>
                <Form.Item label="客户名" hasFeedback>
                    {getFieldDecorator('cust_name', {
                        rules: [{type: "string", required: true, message: "请输入客户名"}],
                    })(<Input style={{width: "600px"}} placeholder={"请输入客户名"}/>)}
                </Form.Item>
                <Form.Item label="客户邮箱" hasFeedback>
                    {getFieldDecorator('cust_email', {
                        rules: [{type: "email", required: true, message: "请输入邮箱"}],
                    })(<Input style={{width: "600px"}} placeholder={"请输入客户邮箱"}/>)}
                </Form.Item>
                <Form.Item label="公司名" hasFeedback>
                    {getFieldDecorator('cust_co', {
                        rules: [{required: true, message: "请输入公司名"}],
                    })(<Input style={{width: "600px"}} placeholder={"请输入公司名"}/>)}
                </Form.Item>
                <Form.Item label="公司地址" hasFeedback>
                    {getFieldDecorator('cust_address', {
                        rules: [{required: true, message: "请输入公司地址"}],
                    })(<Input style={{width: "600px"}} placeholder={"请输入公司地址"}/>)}
                </Form.Item>
                <Form.Item label="客户电话" hasFeedback>
                    {getFieldDecorator('cust_phone', {
                        rules: [
                            {required: true, message: "请输入手机或固话"},
                            {pattern: /^\d*$/, message: "请输入正确的格式"}
                        ],
                    })(<Input addonBefore={<div>+86</div>} style={{width: "600px"}} placeholder={"请输入手机或固话"}/>)}
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleSubmit} icon={"plus-circle"} type={"primary"}>新增顾客</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
};

const INewClientForm = Form.create<IFormProps>()(INewForm);

export default INewClientForm;