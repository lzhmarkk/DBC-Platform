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


export const repoMessIn = mockingRepoMessages.filter((k: any) => (k["direction"] as string).indexOf("IN") != -1);
export const repoMessOut = mockingRepoMessages.filter((k: any) => (k["direction"] as string).indexOf("IN") != -1);
export const prods = mockingProds;
export const repos = mockingRepos;
export const orders = mockingOrders;

const PageRepository = () => {
    return (
        <Switch>
            <Route exact path={"/repository"} render={() => <PageRepositoryDashboard/>}/>
            <Route path={"/repository/dashboard"} render={() => <PageRepositoryDashboard/>}/>
            <Route path={"/repository/in/"} render={() => <PageRepositoryIn/>}/>
            <Route path={"/repository/out/"} render={() => <PageRepositoryOut/>}/>
            <Route path={"/repository/trans/"} render={() => <PageRepositoryTrans/>}/>
        </Switch>)
};
export default PageRepository;