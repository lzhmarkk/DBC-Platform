import React from 'react'
import styles from './index.module.scss'
import {Icon} from "antd"

const NotFound = () => {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Icon type="exclamation" className={styles.ico}/>
                <div className={styles.text}>
                <span>
                    功能正在开发中
                </span>
                </div>
            </div>
        </div>
    )
};

export default NotFound;