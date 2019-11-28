import React, {useState} from "react";
import ISignupPanel, {IFormPayLoad} from "../../Components/Signup";
import Axios from "axios";
import {APIList} from "../../API";
import {message} from "antd";

const PageSignup = () => {
    const handlePost = (prop: any) => {
        console.log("开始post");
        Axios.post(APIList.signup, prop)
            .then(res => {
                console.log(res);
            })
            .catch(() => message.error("获取post的后台返回结果失败"));
        console.log("post完成");
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