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
            "direction": "IN",
            "quantity": "100",
            "prod_name": "西瓜",
            "name": "零号仓库"
        },
        {
            "repo_mess_id": "2",
            "repo_mess_info": "购入100个坦克",
            "direction": "IN",
            "quantity": "100",
            "prod_name": "坦克",
            "name": "三号仓库"
        },
        {
            "repo_mess_id": "3",
            "repo_mess_info": "购入123个ipad",
            "direction": "IN",
            "quantity": "223",
            "prod_name": "iPad",
            "name": "二号仓库"
        }
    ],
    "RepoMessOut": [
        {
            "repo_mess_id": "4",
            "repo_mess_info": "售出100个水壶",
            "direction": "OUT",
            "quantity": "100",
            "prod_name": "水壶",
            "name": "三号仓库"
        },
        {
            "repo_mess_id": "5",
            "repo_mess_info": "售出666盒巧克力",
            "direction": "OUT",
            "quantity": "666",
            "prod_name": "巧克力",
            "name": "二号仓库"
        }
    ],
    "RepoMessTrans": []
};
export default dashboardApiData;