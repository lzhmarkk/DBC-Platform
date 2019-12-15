import {Form, Modal, Radio, Tag} from "antd";
import React from "react";
import {FormComponentProps} from "antd/lib/form";

export const genMessTags = (state: string) => {
    const color = state == "0" ? "volcano" : "green";
    const word = state == "0" ? "未完成" : "已完成";
    return (
        <Tag color={color} key={state}>
            {word}
        </Tag>
    );
};

interface IFormPayload {
    repo_mess_id: string,
    state: string
}

interface IFormProps extends FormComponentProps {
    onSubmit: (payload: IFormPayload) => void,
    curRepoMess: any,
    modelOpen: boolean,
    onCancel: () => void,
    onOk: () => void
}

const form = (props: IFormProps) => {
    const {getFieldDecorator} = props.form;
    const initValue = props.curRepoMess == undefined ? "0" : props.curRepoMess.state;

    const handleSubmit = () => {
        props.form.validateFields((err, value: IFormPayload) => {
            if (err)
                return;
            value = {...value, "repo_mess_id": props.curRepoMess.repo_mess_id};
            props.onSubmit(value);
        })
    };
    return (
        <Modal title="修改状态"
               visible={props.modelOpen}
               onCancel={props.onCancel}
               onOk={() => {
                   props.onOk();
                   handleSubmit()
               }}
               okText="确定"
               cancelText="取消"
        >
            <Form>
                <Form.Item>
                    {getFieldDecorator('state', {
                        initialValue: initValue == "0" ? "1" : "0"
                    })(
                        <Radio.Group>
                            <Radio.Button value={"0"} disabled={initValue == "0"}>
                                未完成
                            </Radio.Button>
                            <Radio.Button value={"1"} disabled={initValue == "1"}>
                                已完成
                            </Radio.Button>
                        </Radio.Group>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};
const IEditMessModel = Form.create<IFormProps>()(form);

export default IEditMessModel;