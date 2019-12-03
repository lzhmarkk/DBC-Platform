const orderDetailApiData =
    {
        "order_id": "121212",
        "order_date": "2019-10-01",
        "cust_id":"2",
        "cust_name": "张三",
        "cust_co": "BUAA",
        "state": "3",
        "order_info": "与高小姐达成的长期进货协议",
        "order_amount": "100000",
        "order_payee": "张三",
        "order_payer": "高萍萍",
        "order_pay_type":"transfer",
        "order_serial": "8967891810204394720194",
        "order_payee_card": "6221014165860322903",
        "order_payee_bank": "中国工商银行",
        "order_tex":"0",
        "order_payer_card": "6221113134381613311",
        "order_payer_bank": "中国农业银行",
        "order_description":"详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息",
        "Prod":[
            {
                "prod_id":"1",
                "prod_name":"螺丝刀",
                "prod_desc":"军用",
                "prod_unit":"只",
                "prod_price":"5",
                "quantity":"100"
            },
            {
                "prod_id":"2",
                "prod_name":"螺丝",
                "prod_desc":"军用",
                "prod_unit":"盒",
                "prod_price":"1",
                "quantity":"40"
            },
            {
                "prod_id":"3",
                "prod_name":"螺母",
                "prod_desc":"军用",
                "prod_unit":"盒",
                "prod_price":"2",
                "quantity":"40"
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
    };
export default orderDetailApiData;