import React from "react";
import {IDetailData} from "../../../../Containers/Repository/Dashboard";
import {Table} from "antd";
import GenColumns from "../../in";

interface IProps {
    data: IDetailData
}

const MessagesShow = 5;
const RepoMessIn = (props: IProps) => {
    const data: any[] = props.data.RepoMessIn.slice(0, MessagesShow);
    const columns = GenColumns((props: { record: any }) => <React.Fragment> </React.Fragment>).slice(0, 7);

    return (
        <Table pagination={false}
               columns={columns}
               dataSource={data}
               rowKey={data => data.repo_mess_id}
        />)
};
export default RepoMessIn;