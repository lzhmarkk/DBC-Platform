import React from "react";
import {Route, Switch} from "react-router";
import PageRepositoryDashboard from "./Dashboard";
import PageRepositoryIn from "./In";
import PageRepositoryOut from "./Out";
import PageRepositoryTrans from "./Trans";
import PageRepositoryDetail from "./Detail";

const PageRepository = () => {
    return (
        <Switch>
            <Route exact path={"/repository"} render={() => <PageRepositoryDashboard/>}/>
            <Route path={"/repository/dashboard"} render={() => <PageRepositoryDashboard/>}/>
            <Route path={"/repository/in/"} render={() => <PageRepositoryIn/>}/>
            <Route path={"/repository/out/"} render={() => <PageRepositoryOut/>}/>
            <Route path={"/repository/trans/"} render={() => <PageRepositoryTrans/>}/>
            <Route path={"/repository/:id"} render={() => <PageRepositoryDetail/>}/>
        </Switch>)
};
export default PageRepository;