import React from "react";
import {Button, Checkbox, Form, Icon, Input} from "antd";
import {FormComponentProps} from "antd/lib/form";
import styles from './index.module.scss'

export interface IFormPayLoad {
    username: string,
    password: string,
    remember: boolean
}

export interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayLoad) => void
}

const IForm = (props: IFormProps) => {
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
        <div className={styles.form}>
            <Form className={styles.hbox} title={"DBC仓库管理系统"}>
                <h1>DBC仓库管理系统</h1>
                <Form.Item label={"用户名"}>
                    {getFieldDecorator("username", {
                        rules: [{required: true, message: "请输入用户名"}],
                    })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                              placeholder="用户名"/>)}
                </Form.Item>
                <Form.Item label={"密码"}>
                    {getFieldDecorator("password", {
                        rules: [{required: true, message: "请输入密码"}],
                    })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                              placeholder="密码"/>)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox>记住我</Checkbox>)}
                    <a className={styles.forgot} onClick={() => alert("please call lzh")}>忘记密码</a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit}>登录</Button>
                    Or <a href="">现在注册</a>
                </Form.Item>
            </Form>
        </div>
    );
};

const ILoginForm = Form.create<IFormProps>()(IForm);

export default ILoginForm;