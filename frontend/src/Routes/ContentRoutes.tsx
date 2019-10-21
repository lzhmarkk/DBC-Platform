import React from "react";
import {Switch, Route} from 'react-router'
import PageDashBoard from '../Containers/DashBoard';
import NotFound from '../Containers/NotFound';
import PageRepository from "../Containers/Repository";
import PageOrder from "../Containers/Order";

const ContentRoutes = () => <Switch>
    <Route exact path="/" render={PageDashBoard}/>
    <Route path="/index" render={PageDashBoard}/>
    <Route path="/repository/" render={PageRepository}/>
    <Route path="/order" render={()=><PageOrder/>}/>
    <Route component={NotFound}/>
</Switch>;

export default ContentRoutes;


