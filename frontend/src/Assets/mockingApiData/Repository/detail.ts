const detailApiData = {
    "repo_id": "1",
    "repo_name": "秘密仓库",
    "repo_capacity": "120",
    "repo_occupy": "10",
    "repo_place":"东北路4号",
    "RepoItem": [
        {
            "prod_id": "3",
            "prod_name": "A380",
            "quantity": "4"
        },
        {
            "prod_id": "2",
            "prod_name": "737",
            "quantity": "2"
        },
        {
            "prod_id": "1",
            "prod_name": "飞机",
            "quantity": "13"
        },
        {
            "prod_id": "4",
            "prod_name": "坦克",
            "quantity": "1"
        },
        {
            "prod_id": "5",
            "prod_name": "轿车",
            "quantity": "20"
        }
    ],
    "RepoMessIn": [
        {
            "repo_mess_id": "1",
            "repo_mess_info": "西瓜爆炸",
            "prod_name": "大西瓜炸弹",
            "order_id": "12",
            "quantity": "10",
            "state": "0"
        },
        {
            "repo_mess_id": "2",
            "repo_mess_info": "东风快递来啦",
            "prod_name": "东风41",
            "order_id": "2019",
            "quantity": "1000",
            "state": "1"
        },
        {
            "repo_mess_id": "3",
            "repo_mess_info": "快递来啦",
            "prod_name": "西风41",
            "order_id": "2119",
            "quantity": "123",
            "state": "0"
        },
        {
            "repo_mess_id": "4",
            "repo_mess_info": "东风快递",
            "prod_name": "东风51",
            "order_id": "1234",
            "quantity": "1",
            "state": "1"
        },
        {
            "repo_mess_id": "5",
            "repo_mess_info": "东风来啦",
            "prod_name": "东风61",
            "order_id": "2010",
            "quantity": "10",
            "state": "0"
        }
    ],
    "RepoMessOut": [
        {
            "repo_mess_id": "1",
            "repo_mess_info": "西瓜爆炸",
            "prod_name": "大西瓜炸弹",
            "order_id": "12",
            "quantity": "10",
            "state": "1"
        },
        {
            "repo_mess_id": "2",
            "repo_mess_info": "东风快递来啦",
            "prod_name": "东风41",
            "order_id": "2019",
            "quantity": "1000",
            "state":"1"
        },
        {
            "repo_mess_id": "3",
            "repo_mess_info": "快递来啦",
            "prod_name": "西风41",
            "order_id": "2119",
            "quantity": "123",
            "state":"1"
        },
        {
            "repo_mess_id": "4",
            "repo_mess_info": "东风快递",
            "prod_name": "东风51",
            "order_id": "1234",
            "quantity": "1",
            "state":"0"
        },
        {
            "repo_mess_id": "5",
            "repo_mess_info": "东风来啦",
            "prod_name": "东风61",
            "order_id": "2010",
            "quantity": "10",
            "state":"1"
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
            "repo_in_id": "7",
            "repo_in_name": "冷冻仓库",
            "quantity": "300",
            "prod_name": "苹果",
            "repo_mess_info": "苹果快坏了"
        },
        {
            "trans_mess_id": "3",
            "repo_out_id": "5",
            "repo_out_name": "冷冻仓库",
            "repo_in_id": "3",
            "repo_in_name": "温暖仓库",
            "quantity": "30000",
            "prod_name": "鸡蛋",
            "repo_mess_info": "鸡蛋太冷了"
        }
    ],
};
export default detailApiData;