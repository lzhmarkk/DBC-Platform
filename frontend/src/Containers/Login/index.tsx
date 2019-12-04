import React, {useEffect, useState} from "react";
import ILoginForm, {IFormPayLoad} from "../../Components/Login";
import Axios from "axios";
import {APIList} from "../../API";
import {message, Spin} from "antd";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "../../@types/store";
import {setLoginState} from "./actions";
import axios from 'axios'
import styles from './index.module.scss'

const PageLogin = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector<IRootStore, any>(e => e.login.loginState);
    const [isCheckLoading, setCheckLoading] = useState(true);

    useEffect(() => {
        axios.post(APIList.checkLogin, {}, {withCredentials: true})
            .then((res) => {
                dispatch(setLoginState(true));
                setCheckLoading(false);
                console.log("login页面确认已经登录");
            })
            .catch((err) => {
                dispatch(setLoginState(false));
                setCheckLoading(false);
                console.log("login页面确认尚未登录");
            })
    }, []);
    const handlePost = (prop: any) => {
        Axios.post(APIList.login, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
                dispatch(setLoginState(true));
            })
            .catch(() => message.error("登录失败"));
    };
    const Form = <ILoginForm onSubmit={
        (e: IFormPayLoad) => {
            console.log(e);
            handlePost(e);
        }}/>;
    const jump = <Redirect to="/index"/>;
    const loading = <div className={styles.root}><Spin/></div>;
    return isCheckLoading ? loading : isLogin ? jump : Form;
};

export default PageLogin;