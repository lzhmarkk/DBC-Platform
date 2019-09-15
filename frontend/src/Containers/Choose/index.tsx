import React from "react";
import {Route, Switch} from "react-router";
import PageChoose from "../../Components/Course/Choose";
import PageChosen from "../../Components/Course/Chosen";

const PageChooseRoute = () => {
    return (
        <Switch>
            <Route exact path={'/course/choose/'} render={() => <PageChoose/>}/>
            <Route path={'/course/chosen/'} render={() => <PageChosen/>}/>
        </Switch>
    )
};
export default PageChooseRoute;