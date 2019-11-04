import React from "react";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input} from "antd";
import styles from "./index.module.scss"

export interface IFormPayLoad {
    email: string
    password: string
    username: string
    recommend: string
}

export interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayLoad) => void,
    //user: { key: string, name: string }[]
}

const SignupPanel = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: any) => {
            if (err)
                return;
            props.onSubmit(value);
        })
    };
    const compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule: any, value: any, callback: any) => {
        const form = props.form;
        if (value) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };
    const {getFieldDecorator} = props.form;
    return (
        <div className={styles.root}>
            <div className={styles.hbox}>
                <h1>注册</h1>
                <Form layout={"horizontal"} onSubmit={handleSubmit}>
                    <Form.Item label="请输入邮箱" hasFeedback>
                        {getFieldDecorator("email", {
                            rules: [
                                {type: "email", message: "请输入正确的邮箱格式"},
                                {required: false, message: "邮箱选填"}
                            ]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="请输入用户名">
                        {getFieldDecorator("username", {
                            rules: [
                                {required: true, message: "用户名必填", whitespace: true}
                            ]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="请输入手机号" hasFeedback>
                        {getFieldDecorator("phone_num", {
                            rules: [
                                {required: true, message: "手机号必填"},
                                {pattern: /\d{11}/, message: "请输入正确的手机号"},
                            ]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="请输入密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: '请输入密码',},
                                {validator: validateToNextPassword},
                            ],
                        })(<Input.Password/>)}
                    </Form.Item>
                    <Form.Item label="请确认密码" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {required: true, message: '请再次输入密码',},
                                {validator: compareToFirstPassword},
                            ],
                        })(<Input.Password/>)}
                    </Form.Item>
                    <Button onClick={handleSubmit} type={"primary"} block>提交</Button>
                </Form>
            </div>
        </div>)
};

const ISignupPanel = Form.create<IFormProps>()(SignupPanel);

export default ISignupPanel;