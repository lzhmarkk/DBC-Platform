import React, {useState} from 'react'
import {Form, Input, Button, Modal, Upload, Icon} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

export interface IEditClientFormPayload {
    cust_id: string,
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
    onSubmit: (payload: IEditClientFormPayload) => void,
    customer: undefined | {
        cust_id: string, cust_name: string, cust_email: string, cust_co: string,
        cust_address: string, cust_phone: string, cust_icon: string, cust_wechat: string,
        cust_qq: string, cust_duty: string, cust_business_scope: string
    },
    modelOpen: boolean,
    setModelOpen: (a: boolean) => void
}

const IEditForm = (props: IFormProps) => {
    const initValue = props.customer;
    const [changeName, setChangeName] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changeCo, setChangeCo] = useState(false);
    const [changeAddr, setChangeAddr] = useState(false);
    const [changePho, setChangePho] = useState(false);
    const [changeDuty, setChangeDuty] = useState(false);
    const [changeScope, setChangeScope] = useState(false);
    const [changeWechat, setChangeWechat] = useState(false);
    const [changeQQ, setChangeQQ] = useState(false);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleSubmit = () => {
        props.form.validateFields((err, value: any) => {
            if (err)
                return;
            props.onSubmit(value);
        })
    };
    const {getFieldDecorator} = props.form;
    return (
        <Modal title="修改客户信息"
               visible={props.modelOpen}
               onCancel={() => {
                   props.setModelOpen(false);
               }}
               onOk={() => {
                   handleSubmit();
                   props.setModelOpen(false);
               }}
               okText="确认修改"
               cancelText="取消">
            <Form
                style={{background: "white"}}>
                <Form.Item label="客户编号" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_id', {
                        initialValue: initValue == undefined ? "" : initValue.cust_id
                    })(<Input style={{width: "200px"}} placeholder={"用户编号"} disabled={true}/>)}
                </Form.Item>
                <Form.Item label="客户名" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_name', {
                        rules: [{type: "string", required: true, message: "请输入客户名"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_name
                    })(<Input style={{width: "400px"}} placeholder={"请输入客户名"} disabled={!changeName}/>)}
                    <Button icon={"lock"} onClick={() => setChangeName(!changeName)}/>
                </Form.Item>
                <Form.Item label="客户邮箱" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_email', {
                        rules: [{type: "email", required: true, message: "请输入邮箱"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_email
                    })(<Input style={{width: "400px"}} placeholder={"请输入客户邮箱"} disabled={!changeEmail}/>)}
                    <Button icon={"lock"} onClick={() => setChangeEmail(!changeEmail)}/>
                </Form.Item>
                <Form.Item label="公司名" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_co', {
                        rules: [{required: true, message: "请输入公司名"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_co
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司名"} disabled={!changeCo}/>)}
                    <Button icon={"lock"} onClick={() => setChangeCo(!changeCo)}/>
                </Form.Item>
                <Form.Item label="公司地址" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_address', {
                        rules: [{required: true, message: "请输入公司地址"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_address
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司地址"} disabled={!changeAddr}/>)}
                    <Button icon={"lock"} onClick={() => setChangeAddr(!changeAddr)}/>
                </Form.Item>
                <Form.Item label="客户电话" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_phone', {
                        rules: [
                            {required: true, message: "请输入手机或固话"},
                            {pattern: /^\d*$/, message: "请输入正确的格式"}
                        ],
                        initialValue: initValue == undefined ? "" : initValue.cust_phone
                    })(<Input addonBefore={<div>+86</div>} style={{width: "400px"}} placeholder={"请输入手机或固话"}
                              disabled={!changePho}/>)}
                    <Button icon={"lock"} onClick={() => setChangePho(!changePho)}/>
                </Form.Item>
                <Form.Item label="职务" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_duty', {
                        rules: [{required: true, message: "请输入职务"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_duty
                    })(<Input style={{width: "400px"}} placeholder={"请输入职务"} disabled={!changeDuty}/>)}
                    <Button icon={"lock"} onClick={() => setChangeDuty(!changeDuty)}/>
                </Form.Item>
                <Form.Item label="业务范围" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_business_scope', {
                        rules: [{required: true, message: "请输入业务范围"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_business_scope
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司名"} disabled={!changeScope}/>)}
                    <Button icon={"lock"} onClick={() => setChangeScope(!changeScope)}/>
                </Form.Item>
                <Form.Item label="微信号" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_wechat', {
                        initialValue: initValue == undefined ? "" : initValue.cust_wechat
                    })(<Input style={{width: "400px"}} placeholder={"请输入微信"} disabled={!changeWechat}/>)}
                    <Button icon={"lock"} onClick={() => setChangeWechat(!changeWechat)}/>
                </Form.Item>
                <Form.Item label="QQ号" style={{marginBottom: "0px"}}>
                    {getFieldDecorator('cust_qq', {
                        initialValue: initValue == undefined ? "" : initValue.cust_qq
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司名"} disabled={!changeQQ}/>)}
                    <Button icon={"lock"} onClick={() => setChangeQQ(!changeQQ)}/>
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
            </Form>
        </Modal>
    )
};

const IEditClientModel = Form.create<IFormProps>()(IEditForm);

export default IEditClientModel;