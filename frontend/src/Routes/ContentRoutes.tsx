import React from "react";
import {Switch, Route} from 'react-router'
import PageDashBoard from '../Containers/DashBoard';
import NotFound from '../Containers/NotFound';
import PageRepository from "../Containers/Repository";

const ContentRoutes = () => <Switch>
    <Route exact path="/" render={() => <PageDashBoard/>}/>
    <Route path="/index" render={() => <PageDashBoard/>}/>
    <Route path="/repository/" render={() => <PageRepository/>}/>
    <Route component={NotFound}/>
</Switch>;

export default ContentRoutes;