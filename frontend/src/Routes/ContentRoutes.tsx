import React from "react";
import {Switch, Route} from 'react-router'
import PageDashBoard from '../Containers/DashBoard';
import NotFound from '../Containers/NotFound';
import PageChoose from "../Components/Choose";
import PageChooseRoute from "../Containers/Choose";

const ContentRoutes = () => <Switch>
    <Route exact path="/" render={PageDashBoard}/>
    <Route path="/course/" render={PageChooseRoute}/>
    <Route component={NotFound}/>
</Switch>;

export default ContentRoutes;


