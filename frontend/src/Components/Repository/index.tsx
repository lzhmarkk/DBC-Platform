import {Tag} from "antd";
import React from "react";

export const genMessTags = (state: string) => {
    const color = state === "0" ? "volcano" : "green";
    const word = state === "0" ? "未完成" : "已完成";
    return (
        <Tag color={color} key={state}>
            {word}
        </Tag>
    );
};