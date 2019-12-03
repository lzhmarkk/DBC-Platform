import React from "react";
import {Route, Switch} from "react-router";
import PageOrderIndex from "./Index";
import PageOrderDetail from "./Detail";

const PageOrder = () => {
    return (
        <Switch>
            <Route exact path={"/order"} render={() => <PageOrderIndex/>}/>
            <Route path={"/order/index"} render={() => <PageOrderIndex/>}/>
            <Route path={"/order/:id"} render={() => <PageOrderDetail/>}/>
        </Switch>
    );
};
export default PageOrder;