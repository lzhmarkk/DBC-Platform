import React from "react";
import {Table} from "antd";
import {GenColumns, IDetailData} from "./index";


interface IProps {
    data: IDetailData
}

const MessagesShow = 5;
const RepoMessOut = (props: IProps) => {
    const data: any[] = props.data.RepoMessOut.slice(0, MessagesShow);
    const columns = GenColumns();

    return (
        <Table pagination={false}
               columns={columns}
               dataSource={data}
        />)
};
export default RepoMessOut