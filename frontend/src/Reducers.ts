import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'


const RootReducers = (history: History) => combineReducers({
    router: connectRouter(history)
});

export default RootReducers;