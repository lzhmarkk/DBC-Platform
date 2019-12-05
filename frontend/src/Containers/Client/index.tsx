import {Route, Switch} from "react-router";
import React from "react";
import PageClientIndex from "./Index/index";
import PageClientDetail from "./Detail";

const PageClient = () => {
    return (
        <Switch>
            <Route exact path={"/client"} render={() => <PageClientIndex/>}/>
            <Route path={"/client/index"} render={() => <PageClientIndex/>}/>
            <Route path={"/client/:id"} render={() => <PageClientDetail/>}/>
        </Switch>
    );
};
export default PageClient;