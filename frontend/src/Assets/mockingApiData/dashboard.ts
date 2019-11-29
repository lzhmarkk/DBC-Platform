const indexApiData = {
    "Messages": [
        {
            "admin_id": "3",
            "work_mess_info": "mess1"
        },
        {
            "admin_id": "1",
            "work_mess_info": "mess2"
        },
        {
            "admin_id": "2",
            "work_mess_info": "mess3"
        }
    ],
    "Repo": [
        {
            "name": "零号仓库",
            "repo_capacity": "120",
            "repo_occupy": "10"
        },
        {
            "name": "一号仓库",
            "repo_capacity": "200",
            "repo_occupy": "105"
        },
        {
            "name": "二号仓库",
            "repo_capacity": "400",
            "repo_occupy": "50"
        }
    ],
    "RepoMessIn": [
        {
            "repo_mess_info": "购入100个西瓜",
            "quantity": "100",
            "repo_name": "零号仓库",
        },
        {
            "repo_mess_info": "购入100个坦克",
            "quantity": "100",
            "repo_name": "三号仓库",
        },
        {
            "repo_mess_info": "购入123个ipad",
            "quantity": "223",
            "repo_name": "二号仓库",
        }
    ],
    "RepoMessOut": [
        {
            "repo_mess_info": "售出100个水壶",
            "quantity": "100",
            "repo_name": "三号仓库",
        },
        {
            "repo_mess_info": "售出666盒巧克力",
            "quantity": "666",
            "repo_name": "二号仓库",
        }
    ],
    "RepoMessTrans": [
        {
            "repo_out_name": "二号仓库",
            "repo_in_name": "一号仓库",
            "quantity": "100",
            "prod_name": "笔记本电脑",
            "repo_mess_info": "日常清点移动"
        },
        {
            "repo_out_name": "炎热仓库",
            "repo_in_name": "冷冻仓库",
            "quantity": "300",
            "prod_name": "苹果",
            "repo_mess_info": "苹果快坏了"
        },
        {
            "repo_out_name": "冷冻仓库",
            "repo_in_name": "温暖仓库",
            "quantity": "30000",
            "prod_name": "鸡蛋",
            "repo_mess_info": "鸡蛋太冷了"
        }
    ],
    "Cust": [
        {
            "cust_name": "张三",
            "cust_co": "东方红公司",
        },
        {
            "cust_name": "李四",
            "cust_co": "西方红公司",
        },
        {
            "cust_name": "王五",
            "cust_co": "很nb公司",
        },
        {
            "cust_name": "赵六",
            "cust_co": "东方红公司",
        },
        {
            "cust_name": "刘七",
            "cust_co": "BUGG",
        }
    ],
    "Graph": [
        {
            "cust_name": "张三",
            "cust_orders": "50"
        },
        {
            "cust_name": "李四",
            "cust_orders": "15"
        },
        {
            "cust_name": "王五",
            "cust_orders": "20"
        },
        {
            "cust_name": "赵六",
            "cust_orders": "15"
        },
        {
            "cust_name": "刘七",
            "cust_orders": "10"
        },
    ]
};
export default indexApiData;