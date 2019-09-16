import React from 'react'
import {Form, Input, Button, Select} from 'antd';
import {Layout, Row} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

export interface IFormPayload {
    width: string
}

interface IFormProps extends FormComponentProps {
    onSet: (payload: IFormPayload) => void,
    field: { [key: string]: string }
}

const setWidthForm = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: IFormPayload) => {
            if (err)
                return;
            props.onSet(value);
            console.log(options);
        })
    };
    const {getFieldDecorator} = props.form;
    const options = Object.keys(props.field).map(e => <Select key={e} value={e}>{props.field[e]}</Select>);
    return (
        <Form layout="inline"
              style={{background: "white"}}
        >
            <Form.Item label="每行显示">
                {getFieldDecorator('width', {
                    rules: [{type: "string", required: true, message: "数字"}],
                })(<Select style={{minWidth: "80px"}}>
                    {options}
                </Select>)}
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} icon={"search"}>确认</Button>
            </Form.Item>
        </Form>
    )
};
const ISetWidthForm = Form.create<IFormProps>()(setWidthForm);

export default ISetWidthForm;
