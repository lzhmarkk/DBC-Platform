import React from "react";
import {Switch, Route} from 'react-router'
import PageDashBoard from '../Containers/DashBoard';
import NotFound from '../Containers/NotFound';

const ContentRoutes = () => <Switch>
    <Route path="/index/" render={PageDashBoard}/>
    <Route component={NotFound}/>
</Switch>;

export default ContentRoutes;


