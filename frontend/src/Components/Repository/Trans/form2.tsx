import React from "react";
import {IRepositoryRecord} from "../interface";
import {Button, Form, Input, Select} from "antd";
import {FormComponentProps} from "antd/lib/form";

export interface IFormPayload {
    repo_in_id: string
}

export interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    repos: IRepositoryRecord[],
    repo_out_id: string
}

const Form2 = (props: IFormProps) => {
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
    const selectOption = props.repos.filter(k => k.repo_id != props.repo_out_id).map(e => <Select.Option key={e.repo_id}
                                                                                                  value={e.repo_id}>{e.name}</Select.Option>);
    return (
        <Form>
            <Form.Item label={"选择转入仓库"}>
                {getFieldDecorator('repo_in_id', {
                    rules: [{type: "string", required: true, message: "请选择转入仓库"}],
                })(<Select style={{minWidth: "160px"}}>
                    {selectOption}
                </Select>)}
            </Form.Item>
            <Button onClick={handleSubmit} type={"primary"} icon={"step-forward"}>下一步</Button>
        </Form>
    );
};
const Step2form = Form.create<IFormProps>()(Form2);
export default Step2form;