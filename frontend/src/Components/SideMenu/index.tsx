import {IMenuItem} from "../../@types/menu";
import {Menu, Icon, Button} from "antd"
import {Link} from "react-router-dom";
import React from "react";

const {Item} = Menu;

const generateMenu = (items: IMenuItem[]) => items.reduce((accu: any[], cur) => {
    return [...accu,
        <Item>
            <Link to={cur.route}>
            <span>
                <Icon type={cur.icon}/>
                <span>{cur.title}</span>
            </span>
            </Link>
        </Item>]
}, []);


const SideMenu = (props: any) => {
    return (
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {generateMenu(mockingMenu)}
        </Menu>
    )
};
export default SideMenu;


const mockingMenu: IMenuItem[] = [
    {
        title: "首页",
        key: "index",
        route: "/index/",
        icon: "home",
    },
    {
        title: "帮助",
        key: "help",
        route: "/help/",
        icon: "container",
    },
];