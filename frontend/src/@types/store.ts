import {ILoginReducer} from "../Containers/Login/reducers";
import {connectRouter, RouterState, LocationChangeAction} from 'connected-react-router'
import {Reducer} from "redux";

export interface IRootStore {
    login: ILoginReducer
    router: RouterState
}