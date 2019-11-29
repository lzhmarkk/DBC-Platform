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
                icon: "appstore",
                children: []
            },
            {
                title: "入库",
                key: "repositoryIn",
                route: "/repository/in",
                icon: "menu-unfold",
                children: []
            },
            {
                title: "出库",
                key: "repositoryOut",
                route: "/repository/out",
                icon: "menu-fold",
                children: []
            },
            {
                title: "调配",
                key: "repositoryTrans",
                route: "/repository/trans",
                icon: "column-width",
                children: []
            },
        ]
    },
    {
        title: "订单",
        key: "order",
        route: "/order",
        icon: "form",
        children: []
    },

    {
        title: "客户信息",
        key: "client",
        route: "/client",
        icon: "apple",
        children: []
    },
    {
        title: "个人信息",
        key: "account",
        route: "/account",
        icon: "user",
        children: []
    },
    {
        title: "帮助",
        key: "help",
        route: "/help/",
        icon: "question-circle",
        children: []
    },
];
export default sideMenuItems;