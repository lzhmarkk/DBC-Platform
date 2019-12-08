import React from "react";
import ISignupPanel, {IFormPayLoad} from "../../Components/Signup";
import Axios from "axios";
import {APIList} from "../../API";
import {message} from "antd";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "../../@types/store";
import {setLoginState} from "../Login/actions";
import styles from "./index.module.scss"

const PageSignup = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector<IRootStore, any>(e => e.login.loginState);
    const handlePost = (prop: any) => {
        Axios.post(APIList.signup, prop, {withCredentials: true})
            .then(res => {
                message.success("注册成功");
                dispatch(setLoginState(true));
            })
            .catch((err) => message.error("注册失败"));
    };
    const form =

        <div className={styles.root}>
            <ISignupPanel onSubmit={
                (e: IFormPayLoad) => {
                    handlePost(e);
                }}/>
        </div>;
    const jump = <Redirect to={"/index"}/>;
    return isLogin ? jump : form;
};
export default PageSignup;