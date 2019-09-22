import React, {useEffect, useState} from 'react'
import APIList from "../../API";
import {Button, message} from "antd";
import Axios from 'axios';

Axios.defaults.withCredentials = true;
const PageDashBoard = () => {
    const [data, setData] = useState([]);
    const click = () => {
        Axios.get(APIList.repo)
            .then(res => {
                console.log(res.data["status"]);
                setData(res.data["status"]);
            })
            .catch(() => message.error("网络错误"))
    };
    return (
        <div>
            This is Dashboard;
            data is

            <p>{data}</p>
            <Button onClick={click}>从后端获取数据</Button>
        </div>
    )
};
export default PageDashBoard;