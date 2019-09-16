import React from "react";
import {Route, Switch} from "react-router";
import PageRepositoryDashboard from "./Dashboard";
import PageRepositoryIn from "./In";
import PageRepositoryOut from "./Out";
import PageRepositoryTrans from "./Trans";

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