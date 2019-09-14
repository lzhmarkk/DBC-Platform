import React from "react";
import {Route, Switch} from "react-router";
import PageChoose from "../../Components/Choose";

const PageChooseRoute = () => {
    return (
        <Switch>
            <Route exact path={'/course/choose/'} render={() => <PageChoose/>}/>
            <Route path={'/course/chosen/'} render={() => <PageChoose/>}/>
        </Switch>
    )
};
export default PageChooseRoute;