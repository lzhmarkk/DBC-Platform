import React from "react";
import './App.css';
import { Provider } from 'react-redux';
import MyStore from './Store';
import {BrowserRouter as Router } from 'react-router-dom'
import MainLayout from './Components/MainLayout';
import ContentRoutes from './Routes/ContentRoutes';

const App: React.FC = () => {
  return (
    <Provider store={MyStore}>
      <Router>
        <MainLayout>
          <ContentRoutes/>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;
