import React, {useState} from "react";
import ISignupPanel, {IFormPayLoad} from "../../Components/Signup";
import Axios from "axios";
import {APIList} from "../../API";
import {message} from "antd";
import {Redirect} from "react-router";

const PageSignup = () => {
    const [login, setLogin] = useState(false);
    const handlePost = (prop: any) => {
        Axios.post(APIList.signup, prop, {withCredentials: true})
            .then(res => {
                console.log(res);
                setLogin(true);
            })
            .catch(() => message.error("注册失败"));
    };
    const form =
        <div>
            <ISignupPanel onSubmit={
                (e: IFormPayLoad) => {
                    console.log(e);
                    handlePost(e);
                }}/>
        </div>;
    const jump = <Redirect to={"/index"}/>;
    return login ? jump : form;
};
export default PageSignup;