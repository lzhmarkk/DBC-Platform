import React from "react";
import {IRepo} from "../interface";
import {Button, Form, Input, Select} from "antd";
import {FormComponentProps} from "antd/lib/form";

export interface IFormPayload {
    repo_out_id: string
}

export interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    repos: IRepo[]
}

const Form3 = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: IFormPayload) => {
            if (err) {
                return
            }
            props.onSubmit(value)
        })
    };
    const {getFieldDecorator} = props.form;
    const selectOption = props.repos.map(e => <Select key={e.repo_id} value={e.repo_id}>{e.name}</Select>);
    return (
        <div>succeed</div>
    );
};
const Step3form = Form.create<IFormProps>()(Form3);
export default Step3form;