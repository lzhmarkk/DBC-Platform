import React, {useState} from "react";
import {IProduct, IRepositoryItems, IRepositoryRecord} from "../interface";
import {Button, Form, Input, Select} from "antd";
import {FormComponentProps} from "antd/lib/form";

export interface IFormPayload {
    prod_out_id: string
    quantity_out: string
    repo_mess_info: string
}

export interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    onBack: () => void,
    repo_out_id: string,
    prods: IProduct[],//这里是所有与该repos相关的prod
    repo_prods: IRepositoryItems[]//揭示了存货信息
}

const Form1 = (props: IFormProps) => {
    const [curProd, setCurProd] = useState("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: IFormPayload) => {
            if (err) {
                return
            }
            setCurProd("");
            props.onSubmit(value);
        });
    };
    const handleBack = () => {
        props.onBack();
    };
    const {getFieldDecorator} = props.form;
    const selectOption = props.prods.map(e => <Select.Option key={e.prod_id} value={e.prod_id}>
        {e.prod_name}</Select.Option>);
    const getNumber = (id: string) => {
        const item = props.repo_prods.filter(k => k.prod_id == id).pop();
        return item == undefined ? 0 : item.quantity;
    };
    const handleChange = (value: string) => {
        setCurProd(value)
    };
    return (
        <Form>
            <Form.Item label={"选择转出产品"} help={`当前该仓库还有${getNumber(curProd)}`}>
                {getFieldDecorator('prod_out_id', {
                    rules: [{type: "string", required: true, message: "请选择转出产品"}],
                })(<Select style={{minWidth: "160px"}} onChange={handleChange}>
                    {selectOption}
                </Select>)}
            </Form.Item>
            <Form.Item label={"转出数量"}>
                {getFieldDecorator('quantity_out', {
                    rules: [{
                        type: "string", required: true,
                        validator: (_, b, c) => {
                            if (isNaN(b) || parseInt(b) <= 0) {
                                c("请输入正整数");
                            } else if (parseInt(b) > getNumber(curProd)) {
                                c("该仓库没有足够的库存");
                            }
                            c();
                        }
                    }]
                })(<Input placeholder={"请输入转出数量"}/>)}
            </Form.Item>
            <Form.Item label={"描述"}>
                {getFieldDecorator('repo_mess_info', {
                    rules: [{type: "string", required: true, message: "请输入描述"}]
                })(<Input placeholder={"请输入描述"}/>)}
            </Form.Item>
            <Button onClick={handleBack} icon={"step-backward"}>上一步</Button>
            <Button onClick={handleSubmit} style={{marginLeft: 8}} type={"primary"} icon={"step-forward"}>下一步</Button>
        </Form>
    );
};
const Step1form = Form.create<IFormProps>()(Form1);
export default Step1form;