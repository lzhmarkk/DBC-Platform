import React from "react";
import './App.css';
import {Provider} from 'react-redux';
import MyStore from './Store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MainLayout from './Components/MainLayout';
import ContentRoutes from './Routes/ContentRoutes';
import PageSignup from "./Containers/Signup";
import PageLogin from "./Containers/Login";

const App: React.FC = () => {
    return (
        <Provider store={MyStore}>
            <Router>
                <Switch>
                    <Route exact path="/login" render={() => <PageLogin/>}/>
                    <Route exact path="/signup" render={() => <PageSignup/>}/>
                    <Route component={() => <MainLayout>
                        <ContentRoutes/>
                    </MainLayout>}/>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
