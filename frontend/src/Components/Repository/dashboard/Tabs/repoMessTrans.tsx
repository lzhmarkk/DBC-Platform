import React from "react";
import {IDetailData} from "../../../../Containers/Repository/Dashboard";
import {Table} from "antd";
import GenColumns from "../../Trans";

interface IProps {
    data: IDetailData
}

const MessagesShow = 5;
const RepoMessTrans = (props: IProps) => {
    const data: any[] = props.data.RepoMessTrans.slice(0, MessagesShow);
    const columns = GenColumns().slice(0, 5);

    return (
        <Table pagination={false}
               columns={columns}
               dataSource={data}
        />);
};
export default RepoMessTrans;