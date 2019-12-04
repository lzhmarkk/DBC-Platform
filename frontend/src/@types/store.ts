import {ILoginReducer} from "../Containers/Login/reducers";
import {RouterState} from 'connected-react-router'

export interface IRootStore {
    login: ILoginReducer
    router: RouterState
}