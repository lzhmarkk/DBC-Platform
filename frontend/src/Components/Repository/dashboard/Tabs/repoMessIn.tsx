import React from "react";
import {IDetailData} from "../../../../Containers/Repository/Dashboard";
import {Table} from "antd";
import GenColumns from "../../in";
import {prods, repos} from "../../../../Containers/Repository";

interface IProps {
    data: IDetailData
}

const MessagesShow = 5;
const RepoMessIn = (props: IProps) => {
    const data: any[] = props.data.RepoMessIn.slice(0, MessagesShow);
    const columns = GenColumns((props: { record: any }) => <div></div>).slice(0, 5);

    return (
        <Table pagination={false}
               columns={columns}
               dataSource={data}
        />)
};
export default RepoMessIn;