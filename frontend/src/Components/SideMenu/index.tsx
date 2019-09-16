import {IMenuItem} from "../../@types/menu";
import {Menu, Icon, Button} from "antd"
import {Link} from "react-router-dom";
import React from "react";
import styles from "./index.module.scss"
import sideMenuItems from "./sideMenuItems";

const {SubMenu, Item} = Menu;

const constructMenuKey = (item: IMenuItem) => item.key;
const generateMenu = (items: IMenuItem[]) => items.reduce((accu: any[], cur) => {
    const tSubMenuItem = cur.children.map(e => e.children.length === 0 ? <Item key={constructMenuKey(e)}>
        <Link to={e.route}>
            <span>
                <span>{e.title}</span>
            </span>
        </Link>
    </Item> : generateMenu([e]));
    return [...accu,
        cur.children.length > 0 ?
            <SubMenu key={constructMenuKey(cur)} className={styles.bigIconItem}
                     title={<span>
                        <span>{cur.title}</span>
                    </span>}>
                {tSubMenuItem}
            </SubMenu> :
            <Item className={styles.bigIconItem} key={constructMenuKey(cur)}>
                <Link to={cur.route}>
            <span>
                <span>
                    {cur.title}
                </span>
            </span>
                </Link>
            </Item>
    ]
}, []);


const SideMenu = (props: any) => {
    return (
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {generateMenu(sideMenuItems)}
        </Menu>
    )
};
export default SideMenu;