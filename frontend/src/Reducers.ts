import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import LoginReducer from "./Containers/Login/reducers";

const RootReducers = (history: History) => combineReducers({
    router: connectRouter(history),
    login: LoginReducer
});

export default RootReducers