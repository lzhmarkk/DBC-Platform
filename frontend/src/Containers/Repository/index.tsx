import React from "react";
import {Route, Switch} from "react-router";
import PageRepositoryDashboard from "./Dashboard";
import PageRepositoryIn from "./In";
import PageRepositoryOut from "./Out";
import PageRepositoryTrans from "./Trans";
import mockingRepoMessages from "../../Assets/mockings/mockingRepoMessages";
import mockingProds from "../../Assets/mockings/mockingProds";
import mockingRepos from "../../Assets/mockings/mockingRepos";
import mockingOrders from "../../Assets/mockings/mockingOrders";
import mockingRepoItems from "../../Assets/mockings/mockingRepoItems";
import {
    IOrder,
    IProd,
    IRepoItem,
    IRepoMess,
    IRepo
} from "../../Components/Repository/interface";
import {withAuth} from "../../Components/Common/AuthWrapper";


export const repoMessIn: IRepoMess[] = mockingRepoMessages.filter((k: any) => (k["direction"] as string).indexOf("IN") != -1);
export const repoMessOut: IRepoMess[] = mockingRepoMessages.filter((k: any) => (k["direction"] as string).indexOf("IN") != -1);
export const prods: IProd[] = mockingProds;
export const repos: IRepo[] = mockingRepos;
export const orders: IOrder[] = mockingOrders;
export const repoItems: IRepoItem[] = mockingRepoItems;

const Page = () => {
    return (
        <Switch>
            <Route exact path={"/repository"} render={() => <PageRepositoryDashboard/>}/>
            <Route path={"/repository/dashboard"} render={() => <PageRepositoryDashboard/>}/>
            <Route path={"/repository/in/"} render={() => <PageRepositoryIn/>}/>
            <Route path={"/repository/out/"} render={() => <PageRepositoryOut/>}/>
            <Route path={"/repository/trans/"} render={() => <PageRepositoryTrans/>}/>
        </Switch>)
};
const PageRepository = withAuth(Page);
export default PageRepository;