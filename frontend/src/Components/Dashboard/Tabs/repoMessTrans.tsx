import React from "react";
import {GenColumnsTrans, IDetailData} from "./index";
import {Table} from "antd";

interface IProps {
    data: IDetailData
}

const MessagesShow = 5;
const RepoMessTrans = (props: IProps) => {
    const data: any[] = props.data.RepoMessTrans.slice(0, MessagesShow);
    const columns = GenColumnsTrans().slice(0, 5);

    return (
        <Table pagination={false}
               columns={columns}
               dataSource={data}
        />);
};
export default RepoMessTrans;