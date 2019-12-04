import produce from "immer"
import {ActionType, ActionEnum} from "./actions";

export interface ILoginReducer {
    loginState: boolean
}

const InitState = {
    loginState: false
};

const LoginReducer = (state: ILoginReducer = InitState, action: ActionType) => produce<ILoginReducer>(state, draft => {
    switch (action.type) {
        case ActionEnum.setLoginState:
            draft.loginState = action.state;
            break;
        case ActionEnum.logout:
            sessionStorage.clear();
            draft.loginState = false;
            break;
    }
});

export default LoginReducer;