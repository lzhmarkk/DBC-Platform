import React from 'react'
import {Form, Input, Button, Select} from 'antd';
import {Layout, Row} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

export interface IFormPayload {
    field: string
    content: string
}

interface IFormProps extends FormComponentProps {
    onSearch: (payload: IFormPayload) => void,
    field: { [key: string]: string }

}

const SearchForm = (props: IFormProps) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, value: IFormPayload) => {
            if (err)
                return;
            props.onSearch(value);
        })
    };
    const options = Object.keys(props.field).map(e => <Select key={e} value={e}>{props.field[e]}</Select>);
    const {getFieldDecorator} = props.form;
    return (
        <Form layout="inline"
              style={{background: "white"}}
        >
            <Form.Item label="搜索字段">
                {getFieldDecorator('field', {
                    rules: [{type: "string", required: true, message: "请选择搜索字段"}],
                })(<Select style={{minWidth: "80px"}}>
                    {options}
                </Select>)}
            </Form.Item>
            <Form.Item label="搜索内容">
                {getFieldDecorator('content', {
                    rules: [{type: "string", required: false}],
                })(<Input placeholder="搜索内容"/>)}
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} icon={"search"}>搜索</Button>
            </Form.Item>
        </Form>
    )
};
const ISearchPanel = Form.create<IFormProps>()(SearchForm);

export default ISearchPanel;
