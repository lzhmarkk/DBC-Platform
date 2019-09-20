import React from "react";
import {IDetailData} from "../../../../Containers/Repository/Dashboard";
import {IRepoMess, IWorkMess} from "../../interface";
import {Table} from "antd";
import GenColumns, {id2Name} from "../../in";
import {prods, repos} from "../../../../Containers/Repository";

interface IProps {
    data: IDetailData
}

const MessagesShow = 5;
const RepoMessIn = (props: IProps) => {
    const data: IRepoMess[] = props.data.RepoMessIn.filter((k: any) => (k["direction"] as string).indexOf("IN") != -1).slice(0, MessagesShow);
    const columns = GenColumns((props: { record: any }) => <div></div>).slice(0, 5);

    const refinedData = (data: IRepoMess[]) => {
        return data.map(e => ({
            ...e,
            "repo_name": id2Name(e.repo_id, repos, "repo_id", "name"),
            "prod_name": id2Name(e.prod_id, prods, "prod_id", "prod_name")
        }))
    };
    return (
        <Table pagination={false}
               columns={columns}
               dataSource={refinedData(data)}
        />)
};
export default RepoMessIn;