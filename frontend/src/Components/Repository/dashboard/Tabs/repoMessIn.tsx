import React from "react";
import {IDetailData} from "../../../../Containers/Repository/Dashboard";
import {IRepositoryMessRecord, IWorkMessRecord} from "../../interface";
import {Table} from "antd";
import GenColumns from "../../in";

interface IProps {
    data: IDetailData
}

const MessagesShow = 5;
const RepoMessIn = (props: IProps) => {
    const data: IRepositoryMessRecord[] = props.data.RepoMessIn.filter((k: any) => (k["direction"] as string).indexOf("IN") != -1).slice(0, MessagesShow);
    const columns = GenColumns((props: { record: any }) => <div></div>).slice(0, 5);
    return (
        <Table pagination={false}
               columns={columns}
               dataSource={data}
        />)
};
export default RepoMessIn;