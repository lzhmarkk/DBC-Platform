const dashboardApiData = {
    "Repo": [
        {
            "repo_id": "1",
            "name": "零号仓库",
            "repo_capacity": "120",
            "repo_occupy": "10"
        },
        {
            "repo_id": "2",
            "name": "一号仓库",
            "repo_capacity": "200",
            "repo_occupy": "105"
        },
        {
            "repo_id": "3",
            "name": "二号仓库",
            "repo_capacity": "400",
            "repo_occupy": "50"
        }
    ],
    "Messages": [
        {
            "admin_id": "2",
            "work_mess_id": "1",
            "work_mess_info": "快去开汽车"
        },
        {
            "admin_id": "1",
            "work_mess_id": "2",
            "work_mess_info": "快去开飞机"
        },
        {
            "admin_id": "1",
            "work_mess_id": "3",
            "work_mess_info": "快去开坦克"
        },
    ],
    "RepoMessIn": [
        {
            "repo_mess_id": "1",
            "repo_mess_info": "购入100个西瓜",
            "quantity": "100",
            "prod_name": "西瓜",
            "prod_id": "6",
            "repo_name": "零号仓库",
            "repo_id": "1",
        },
        {
            "repo_mess_id": "2",
            "repo_mess_info": "购入100个坦克",
            "quantity": "100",
            "prod_name": "坦克",
            "prod_id": "9",
            "repo_name": "三号仓库",
            "repo_id": "4"
        },
        {
            "repo_mess_id": "3",
            "repo_mess_info": "购入123个ipad",
            "quantity": "223",
            "prod_name": "iPad",
            "prod_id": "3",
            "repo_name": "二号仓库",
            "repo_id": "3"
        }
    ],
    "RepoMessOut": [
        {
            "repo_mess_id": "4",
            "repo_mess_info": "售出100个水壶",
            "quantity": "100",
            "prod_name": "水壶",
            "prod_id": "1",
            "repo_name": "三号仓库",
            "repo_id": "4"
        },
        {
            "repo_mess_id": "5",
            "repo_mess_info": "售出666盒巧克力",
            "quantity": "666",
            "prod_name": "巧克力",
            "prod_id": "4",
            "repo_name": "二号仓库",
            "repo_id": "3"
        }
    ],
    "RepoMessTrans": [
        {
            "trans_mess_id": "1",
            "repo_out_id": "2",
            "repo_out_name": "二号仓库",
            "repo_in_id": "1",
            "repo_in_name": "一号仓库",
            "quantity": "100",
            "prod_name": "笔记本电脑",
            "repo_mess_info": "日常清点移动"
        },
        {
            "trans_mess_id": "2",
            "repo_out_id": "4",
            "repo_out_name": "炎热仓库",
            "repo_in_id": "6",
            "repo_in_name": "冷冻仓库",
            "quantity": "300",
            "prod_name": "苹果",
            "repo_mess_info": "苹果快坏了"
        },
        {
            "trans_mess_id": "3",
            "repo_out_id": "4",
            "repo_out_name": "冷冻仓库",
            "repo_in_id": "7",
            "repo_in_name": "温暖仓库",
            "quantity": "30000",
            "prod_name": "鸡蛋",
            "repo_mess_info": "鸡蛋太冷了"
        }
    ]
};
export default dashboardApiData;