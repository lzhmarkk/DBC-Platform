import React, {useState} from 'react'
import {Form, Input, Button, Modal, Col} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

export interface IFormPayload {
    cust_name: string,
    cust_email: string,
    cust_co: string,
    cust_address: string,
    cust_phone: string
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    customer: undefined | { cust_id: string, cust_name: string, cust_email: string, cust_co: string, cust_address: string, cust_phone: string },
    modelOpen: boolean,
    setModelOpen: (a: boolean) => void,
    setCurClient: (a: any) => void,
}

const IForm = (props: IFormProps) => {
    const initValue = props.customer;
    const [changeName, setChangeName] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changeCo, setChangeCo] = useState(false);
    const [changeAddr, setChangeAddr] = useState(false);
    const [changePho, setChangePho] = useState(false);

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
                   props.setCurClient(undefined);
               }}
               onOk={() => {
                   handleSubmit();
                   props.setModelOpen(false);
                   props.setCurClient(undefined);
               }}
               okText="确认修改"
               cancelText="取消">
            <Form
                style={{background: "white"}}>
                <Form.Item label="客户名">
                    {getFieldDecorator('cust_name', {
                        rules: [{type: "string", required: true, message: "请输入客户名"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_name
                    })(<Input style={{width: "400px"}} placeholder={"请输入客户名"} disabled={!changeName}/>)}
                    <Button icon={"lock"} onClick={() => setChangeName(!changeName)}/>
                </Form.Item>
                <Form.Item label="客户邮箱">
                    {getFieldDecorator('cust_email', {
                        rules: [{type: "email", required: true, message: "请输入邮箱"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_email
                    })(<Input style={{width: "400px"}} placeholder={"请输入客户邮箱"} disabled={!changeEmail}/>)}
                    <Button icon={"lock"} onClick={() => setChangeEmail(!changeEmail)}/>
                </Form.Item>
                <Form.Item label="公司名">
                    {getFieldDecorator('cust_co', {
                        rules: [{required: true, message: "请输入公司名"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_co
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司名"} disabled={!changeCo}/>)}
                    <Button icon={"lock"} onClick={() => setChangeCo(!changeCo)}/>
                </Form.Item>

                <Form.Item label="公司地址">
                    {getFieldDecorator('cust_address', {
                        rules: [{required: true, message: "请输入公司地址"}],
                        initialValue: initValue == undefined ? "" : initValue.cust_address
                    })(<Input style={{width: "400px"}} placeholder={"请输入公司地址"} disabled={!changeAddr}/>)}
                    <Button icon={"lock"} onClick={() => setChangeAddr(!changeAddr)}/>
                </Form.Item>

                <Form.Item label="客户电话">
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
            </Form>
        </Modal>
    )
};

const IEditClientModel = Form.create<IFormProps>()(IForm);

export default IEditClientModel;