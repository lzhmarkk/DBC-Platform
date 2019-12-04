import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import APIList from "../../../API";
import {logout, setLoginState} from "../../../Containers/Login/actions";
import {message, Spin} from "antd";
import axios from 'axios'

const PageAuthWrapper = (props: { children: JSX.Element }) => {
    const dispatch = useDispatch();
    const [checkingLogin, setCheckingLogin] = useState(true);

    useEffect(() => {
        axios.post(APIList.checkLogin, {}, {withCredentials: true})
            .then((res) => {
                dispatch(setLoginState(true));
                console.log("wrapper确认登录");
                setCheckingLogin(false);
            })
            .catch((err) => {
                message.error("请您先登录");
                dispatch(logout());
                console.log("wrapper确认未登录");
                setCheckingLogin(false);
            })
    }, []);
    return checkingLogin ? <Spin/> : props.children;
};

export function withAuth<T extends any>(Children: (props: T) => JSX.Element) {
    return (props: T) => <PageAuthWrapper>
        <Children {...props}/>
    </PageAuthWrapper>
}

export default PageAuthWrapper;