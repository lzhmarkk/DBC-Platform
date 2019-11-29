import {IMenuItem} from "../../@types/menu";
import {Menu, Icon, Button} from "antd"
import {Link} from "react-router-dom";
import React from "react";
import styles from "./index.module.scss"
import sideMenuItems from "./sideMenuItems";

const {SubMenu, Item} = Menu;

const constructMenuKey = (item: IMenuItem) => item.key;
const generateMenu = (items: IMenuItem[], collapsed: boolean) => items.reduce((accu: any[], cur) => {
    const tSubMenuItem = cur.children.map(e =>
        <Item key={constructMenuKey(e)}>
            <Link to={e.route}>
            <span>
                <Icon type={e.icon}/>
                {
                    !collapsed ?
                        <span>{e.title}</span> :
                        <React.Fragment> </React.Fragment>
                }
            </span>
            </Link>
        </Item>
    );
    return [...accu,
        cur.children.length > 0 ?
            <SubMenu key={constructMenuKey(cur)} className={styles.bigIconItem}
                     title={<span>
                         <Icon type={cur.icon}/>
                         {
                             !collapsed ?
                                 <span>{cur.title}</span> :
                                 <React.Fragment> </React.Fragment>
                         }
                    </span>}>
                {tSubMenuItem}
            </SubMenu> :
            <Item className={styles.bigIconItem} key={constructMenuKey(cur)}>
                <Link to={cur.route}>
            <span>
                <Icon type={cur.icon}/>
                {
                    !collapsed ?
                        <span>{cur.title}</span> :
                        <React.Fragment> </React.Fragment>
                }
            </span>
                </Link>
            </Item>
    ]
}, []);


const SideMenu = (props: { collapsed: boolean }) => {
    return (
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {generateMenu(sideMenuItems, props.collapsed)}
        </Menu>
    )
};
export default SideMenu;