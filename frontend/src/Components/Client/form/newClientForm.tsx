import React from 'react'
import {Button, Drawer, Form, Icon, Input, Upload} from "antd";
import {FormComponentProps} from "antd/lib/form";

export interface INewClientFormPayload {
    cust_name: string,
    cust_email: string,
    cust_co: string,
    cust_address: string,
    cust_phone: string,
    cust_icon: any,
    cust_wechat: string,
    cust_qq: string,
    cust_duty: string,
    cust_business_scope: string
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: INewClientFormPayload) => void,
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
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const {getFieldDecorator} = props.form;
    return (
        <Drawer title={"新增客户"}
                width={720}
                onClose={() => props.setDrawerOpen(false)}
                visible={props.drawerOpen}>
            <Form
                style={{background: "white"}}>
                <Form.Item label="客户名" hasFeedback style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_name', {
                        rules: [{type: "string", required: true, message: "请输入客户名"}],
                    })(<Input style={{width: "400px"}} placeholder={"请输入客户名"}/>)}
                </Form.Item>
                <Form.Item label="客户邮箱" hasFeedback style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_email', {
                        rules: [{type: "email", required: true, message: "请输入邮箱"}],
                    })(<Input style={{width: "400px"}} placeholder={"请输入客户邮箱"}/>)}
                </Form.Item>
                <Form.Item label="公司名" hasFeedback style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_co', {
                        rules: [{required: true, message: "请输入公司名"}],
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司名"}/>)}
                </Form.Item>
                <Form.Item label="公司地址" hasFeedback style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_address', {
                        rules: [{required: true, message: "请输入公司地址"}],
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司地址"}/>)}
                </Form.Item>
                <Form.Item label="客户电话" hasFeedback style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_phone', {
                        rules: [
                            {required: true, message: "请输入手机或固话"},
                            {pattern: /^\d*$/, message: "请输入正确的格式"}
                        ],
                    })(<Input addonBefore={<div>+86</div>} style={{width: "400px"}} placeholder={"请输入手机或固话"}/>)}
                </Form.Item>
                <Form.Item label="职务" hasFeedback style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_duty', {
                        rules: [{required: true, message: "请输入职务"}],
                    })(<Input style={{width: "400px"}} placeholder={"请输入职务"}/>)}
                </Form.Item>
                <Form.Item label="业务范围" hasFeedback style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_business_scope', {
                        rules: [{required: true, message: "请输入业务范围"}],
                    })(<Input style={{width: "400px"}} placeholder={"请输入业务范围"}/>)}
                </Form.Item>
                <Form.Item label="微信号" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_wechat', {})(<Input style={{width: "400px"}} placeholder={"请输入微信"}/>)}
                </Form.Item>
                <Form.Item label="QQ号" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_qq', {})(<Input style={{width: "400px"}} placeholder={"请输入QQ号"}/>)}
                </Form.Item>
                <Form.Item label="头像">
                    {getFieldDecorator('cust_icon', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(<Upload name="logo" listType="picture">
                        <Button>
                            <Icon type="upload"/>点击上传头像
                        </Button>
                    </Upload>)}
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