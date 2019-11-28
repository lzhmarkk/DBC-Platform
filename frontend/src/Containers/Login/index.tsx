import React, {useEffect, useState} from "react";
import ILoginForm, {IFormPayLoad} from "../../Components/Login";
import Axios from "axios";
import {APIList, getAuthHeaders, setAuthToken} from "../../API";
import {message, Spin} from "antd";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'
import {IRootStore} from "../../@types/store";
import {setLoginState} from "./actions";
import styles from './index.module.scss'

const PageLogin = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector<IRootStore, any>(e => e.login.loginState);
    const [isCheckLoading, setCheckLoading] = useState(true);

    useEffect(() => {
        const authHeaders = getAuthHeaders();
        axios.post(APIList.checkLogin, {}, {headers: authHeaders})
            .then((res) => {
                dispatch(setLoginState(true));
                setCheckLoading(false);
                console.log("check login succeed");
            })
            .catch((err) => {
                dispatch(setLoginState(false));
                setCheckLoading(false);
                console.log("check login fail");
            })
    }, []);

    const handlePost = (prop: any) => {
        console.log("开始post");
        Axios.post(APIList.login, prop)
            .then(res => {
                console.log(res);
                setAuthToken(res.data.token);
                dispatch(setLoginState(true));
            })
            .catch(() => {
                message.error("获取post的后台返回结果失败");
                dispatch(setLoginState(true));//todo: develop
            });
        console.log("post完成");
    };
    const Form = <ILoginForm onSubmit={
        (e: IFormPayLoad) => {
            console.log(e);
            handlePost(e);
        }}/>;
    const jump = <Redirect to="/index"/>;
    const loading = <div className={styles.root}><Spin tip={"正在确认登录状态"}/></div>;
    return isCheckLoading ? loading : isLogin ? jump : Form;
};

export default PageLogin;