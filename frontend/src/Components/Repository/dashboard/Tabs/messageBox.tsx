import React from "react";
import {Collapse} from 'antd';
import {IDetailData} from "../../../../Containers/Repository/Dashboard";
import {IWorkMess} from "../../interface";

interface IProps {
    data: IDetailData
}

const {Panel} = Collapse;
const MessageBox = (props: IProps) => {
    const data: IWorkMess[] = props.data.Messages;

    const items = data.map(e =>
        <Panel header={e.admin_id} key={e.work_mess_id}>
            <p>{e.work_mess_info}</p>
        </Panel>
    );
    const callback = (key: any) =>
        console.log(key);

    return (
        <Collapse onChange={callback}>
            {items}
        </Collapse>
    )
};
export default MessageBox;