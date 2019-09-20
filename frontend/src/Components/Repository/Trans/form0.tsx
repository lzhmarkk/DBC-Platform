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

const Form0 = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: IFormPayload) => {
            if (err) {
                return
            }
            props.onSubmit(value);
        })
    };
    const {getFieldDecorator} = props.form;
    const selectOption = props.repos.map(e => <Select.Option key={e.repo_id} value={e.repo_id}>{e.name}</Select.Option>);
    return (
        <Form>
            <Form.Item label={"选择转出仓库"}>
                {getFieldDecorator('repo_out_id', {
                    rules: [{type: "string", required: true, message: "请选择转出仓库"}],
                })(<Select style={{minWidth: "160px"}}>
                    {selectOption}
                </Select>)}
            </Form.Item>
            <Button onClick={handleSubmit} type={"primary"} icon={"step-forward"}>下一步</Button>
        </Form>
    );
};
const Step0form = Form.create<IFormProps>()(Form0);
export default Step0form;