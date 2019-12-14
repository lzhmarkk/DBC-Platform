import React from 'react'
import {Button, Form, Input} from "antd";
import {FormComponentProps} from "antd/lib/form";

export interface IFormPayload {
    repo_name: string,
    repo_capacity: string
    repo_place: string
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void
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
        <Form style={{background: "white"}} layout={"inline"}>
            <Form.Item label="仓库名">
                {getFieldDecorator('repo_name', {
                    rules: [{type: "string", required: true, message: "请输入仓库名"}],
                })(<Input/>)}
            </Form.Item>
            <Form.Item label="仓库容量">
                {getFieldDecorator('repo_capacity', {
                    rules: [{pattern: /^\d+$/, required: true, message: "请输入容量"}],
                })(<Input/>)}
            </Form.Item>
            <Form.Item label="地址">
                {getFieldDecorator('repo_place', {
                    rules: [{required: true, message: "请输入地址"}],
                })(<Input/>)}
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} icon={"plus-circle"} type={"primary"}>添加仓库</Button>
            </Form.Item>
        </Form>
    )
};

const INewRepoForm = Form.create<IFormProps>()(INewForm);

export default INewRepoForm;