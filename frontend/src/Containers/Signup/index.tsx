import React, {useState} from "react";
import ISignupPanel, {IFormPayLoad} from "../../Components/Signup";
import Axios from "axios";
import {APIList} from "../../API";
import {message} from "antd";

const PageSignup = () => {
    const [form, setForm] = useState();
    const handlePost = (prop: any) => {
        Axios.post(APIList.signup, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("注册失败"));
    };
    return (
        <div>
            <ISignupPanel onSubmit={
                (e: IFormPayLoad) => {
                    console.log(e);
                    handlePost(e);
                }}/>
        </div>
    )
};
export default PageSignup;