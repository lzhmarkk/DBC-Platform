import React, {useState} from "react";
import ILoginForm, {IFormPayLoad} from "../../Components/Login";
import Axios from "axios";
import {APIList} from "../../API";
import {message} from "antd";
import {Redirect} from "react-router";

const PageLogin = () => {
    const [login, setLogin] = useState(false);
    const handlePost = (prop: any) => {
        console.log("开始post");
        Axios.post(APIList.order, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("获取post的后台返回结果失败"));
        console.log("post完成");
        setLogin(true);
    };
    const Form = <ILoginForm onSubmit={
        (e: IFormPayLoad) => {
            console.log(e);
            handlePost(e);
        }}/>;
    const jump = <Redirect to="/index"/>;
    return login ? jump : Form;
};

export default PageLogin;