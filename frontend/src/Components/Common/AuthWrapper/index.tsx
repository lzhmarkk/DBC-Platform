import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {IRootStore} from "../../../@types/store";
import APIList, {getAuthHeaders} from "../../../API";
import {setLoginState} from "../../../Containers/Login/actions";
import {message, Spin} from "antd";
import axios from 'axios'

const PageAuthWrapper = (props: { children: JSX.Element }) => {
    const isLogin = useSelector((e: IRootStore) => e.login.loginState);
    const dispatch = useDispatch();

    useEffect(() => {
        const authHeaders = getAuthHeaders();
        console.log("Checking login");
        axios.post(APIList.checkLogin, {}, {headers: authHeaders})
            .then((res) => {
                console.log("checklogin success");
                dispatch(setLoginState(true))
            })
            .catch((err) => {
                console.log("checklogin fail");
                //dispatch(setLoginState(false));
                dispatch(setLoginState(true));//todo: develop
                message.error("请您先登录");
            })
    }, [isLogin]);
    return isLogin ? props.children : <Spin tip={"正在确认登录状态"}/>
};

export function withAuth<T extends any>(Children: (props: T) => JSX.Element) {
    return (props: T) => <PageAuthWrapper>
        <Children {...props}/>
    </PageAuthWrapper>
}

export default PageAuthWrapper;