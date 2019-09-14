import {IMenuItem} from "../../@types/menu";

const mockingSideMenu: IMenuItem[] = [
    {
        title: "首页",
        key: "index",
        route: "/",
        icon: "home",
        children: []
    },
    {
        title: "选课",
        key: "Choose",
        route: "/Choose",
        icon: "container",
        children: [
            {
                title: "选课页",
                key: "Choose",
                route: "Choose",
                icon: "home",
                children: []
            },
            {
                title: "已选课程",
                key: "course",
                route: "/course",
                icon: "home",
                children: []
            },
        ]
    },
    {
        title: "换课",
        key: "exchange",
        route: "/exchange",
        icon: "home",
        children: [
            {
                title: "我要换课",
                key: "exchange",
                route: "/exchange",
                icon: "home",
                children: []
            },
            {
                title: "换课情况",
                key: "exchange-show",
                route: "/exchange/show",
                icon: "home",
                children: []
            },
        ]
    },
    {
        title: "个人信息",
        key: "user",
        route: "/user",
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
export default mockingSideMenu;