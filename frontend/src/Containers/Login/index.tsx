import React, {useState} from "react";
import ILoginForm, {IFormPayLoad} from "../../Components/Login";
import Axios from "axios";
import {APIList} from "../../API";
import {message} from "antd";
import {Redirect} from "react-router";

const PageLogin = () => {
    const [login, setLogin] = useState(false);
    const handlePost = (prop: any) => {
        Axios.post(APIList.login, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("登录失败"));
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