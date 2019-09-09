import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import RootReducers from '../Reducers';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const MyStore = createStore(RootReducers(history), composeEnhancer(
    applyMiddleware(
        routerMiddleware(history),
        logger
    ),
));

export default MyStore;