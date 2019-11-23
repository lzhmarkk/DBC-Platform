import {IMenuItem} from "../../@types/menu";

const sideMenuItems: IMenuItem[] = [
    {
        title: "首页",
        key: "index",
        route: "/index",
        icon: "home",
        children: []
    },
    {
        title: "仓库管理",
        key: "repository",
        route: "/repository",
        icon: "container",
        children: [
            {
                title: "总览",
                key: "repository",
                route: "/repository/dashboard",
                icon: "home",
                children: []
            },
            {
                title: "入库",
                key: "repositoryIn",
                route: "/repository/in",
                icon: "home",
                children: []
            },
            {
                title: "出库",
                key: "repositoryOut",
                route: "/repository/out",
                icon: "home",
                children: []
            },
            {
                title: "调配",
                key: "repositoryTrans",
                route: "/repository/trans",
                icon: "home",
                children: []
            },
        ]
    },
    {
        title: "订单",
        key: "order",
        route: "/order",
        icon: "home",
        children: []
    },

    {
        title: "客户信息",
        key: "client",
        route: "/client",
        icon: "home",
        children: []
    },
    {
        title: "个人信息",
        key: "account",
        route: "/account",
        icon: "home",
        children: []
    },
    {
        title: "帮助",
        key: "help",
        route: "/help/",
        icon: "container",
        children: []
    },
];
export default sideMenuItems;