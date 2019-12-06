

#### "/api/repository/dashboard"

```json
GET:
{
    "Repo": [
        {
            "repo_id": "1",
            "name": "零号仓库",
            "repo_capacity": "120",
            "repo_occupy": "10"
        }
    ],
    "Messages": [
        {
            "admin_id": "2",
            "work_mess_id": "1",
            "work_mess_info": "快去开汽车"
        }
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
            "order_id":"111",
            "state":"0"
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
            "repo_id": "4",
            "order_id":"111",
            "state":"0"
        }
    ],
    "RepoMessTrans": [
        {
            "trans_mess_id":"1",
            "repo_out_id": "2",
            "repo_out_name": "二号仓库",
            "repo_in_id": "1",
            "repo_in_name": "一号仓库",
            "quantity": "100",
            "prod_name": "笔记本电脑",
            "repo_mess_info": "日常清点移动"
        }
    ]
}
```

#### "/api/repository/in"

```json

POST：//新增转入请求
{	
    //PS：需要在后端实现"repo_mess_id"自增
	"type":"NEW_MESS_IN",//类型
    "data":{
		"repo_mess_info":"购入iPad",
		"prod_id":"3",
		"quantity":"2",
		"repo_id":"1",
		"order_id":"10"
    }
}
PUT:
{
    "type": "EDIT_MESS_IN",
    "data": {
        "repo_mess_id": e.repo_mess_id,
        "state": e.state
    }
}
GET:
{
    "RepoMessIn": [
        {
            "repo_mess_id": "1",
            "repo_mess_info": "西瓜爆炸",
            "repo_name": "一号仓库",
            "repo_id": "2",
            "prod_name": "大西瓜炸弹",
            "prod_id": "6",
            "quantity": "100",
            "order_id": "12",
            "state":"0"
        }
    ],
    "Repo": [
        {
            "repo_id": "1",
            "repo_name": "零号仓库"
        }
    ],
    "Prod": [
        {
            "prod_id": "1",
            "prod_name": "苹果"
        }
    ],
    "Order": [
        {
            "order_id": "23425534534534"
        }
    ]
}
```

#### "/api/repository/out"

```json
//出库
//自行将in改成out
```

#### "/api/repository/trans"

```json
//调库
POST:
{
	"type":"NEW_MESS_TRANS",
	"data":{
		"repo_out_id":"3",//被调出的仓库id
		"prod_out_id":"4",//被调动的产品id
		"quantity":"3334",//数量
		"repo_mess_info":"我是描述",//描述
		"repo_in_id":"5",//被调入的仓库id
	}
}
PUT:
{
    "type": "EDIT_MESS_OUT",
    "data": {
        "repo_mess_id": e.repo_mess_id,
        "state": e.state
    }
}
GET:
{
    "Repo": [
        {
            "repo_id": "1",
            "repo_name": "秘密仓库",
            "RepoItem": [
                {
                    "prod_id": "3",
                    "prod_name": "A380",
                    "quantity": "4"
                }
            ]
        }
    ]
}
```
#### "/api/repository/${id}/"

```json
GET:
{
    "repo_id": "1",
    "repo_name": "秘密仓库",
    "repo_capacity": "120",
    "repo_occupy": "10",
    "RepoItem": [
        {
            "prod_id": "3",
            "prod_name": "A380",
            "quantity": "4"
        }
    ],
    "RepoMessIn": [
        {
            "repo_mess_id": "1",
            "repo_mess_info": "西瓜爆炸",
            "prod_name": "大西瓜炸弹",
            "order_id": "12",
            "quantity": "10",
            "state":"1"
        }
    ],
    "RepoMessOut": [
        {
            "repo_mess_id": "1",
            "repo_mess_info": "西瓜爆炸",
            "prod_name": "大西瓜炸弹",
            "order_id": "12",
            "quantity": "10",
            "state":"0"
        }
    ],
    "RepoMessTrans": [
        {
            "trans_mess_id":"1",
            "repo_out_id": "2",
            "repo_out_name": "二号仓库",
            "repo_in_id": "1",
            "repo_in_name": "一号仓库",
            "quantity": "100",
            "prod_name": "笔记本电脑",
            "repo_mess_info": "日常清点移动"
        }
    ],
}
```

#### "/api/order/index"

```json
//订单
POST:
{
    "type": "NEW_ORDER",
    "data": {
        "cust_id":"2",
        "order_info": "与高小姐达成的长期进货协议",
        "order_date": "2019-10-01",
        "state": "3",
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
        "order_description":"详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息",
        "Prod":[//如果没有该产品，创建一个，产品的候选码可以为name
            {
                "prod_name":"螺丝刀",
                "prod_desc":"军用",
                "prod_unit":"只",
                "prod_price":"5",
                "quantity":"100"
            }
        ],
    }
}
PUT:
{
    "type": "EDIT_ORDER",
    "data": {
        "order_id":"1",
        //同post
    }
}
GET:
{
        "Order": [
            {
                "order_id": "121212",
                "order_date": "2019-10-01",
                "cust_id": "1",
                "cust_name": "张三",
                "cust_co": "BUAA",
                "state": "3",
                "order_info": "订单1"
            }
        ],
        "Cust": [
            {
                "cust_id": "1",
                "cust_name": "张三",
                "cust_co": "BUAA"
            }
        ],
        "Graph": [
            {"date": "2019-01-01", "value": "0"},
            {"date": "2019-01-02", "value": "3"},
            {"date": "2019-01-03", "value": "0"},
            {"date": "2019-01-04", "value": "4"},
            {"date": "2019-01-05", "value": "0"},
            {"date": "2019-01-06", "value": "2"},
            {"date": "2019-01-07", "value": "6"},
            {"date": "2019-01-08", "value": "0"},
        ]
    }
```

#### "/api/order/${id}"

```json
GET:
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
        "order_description":"详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息",
        "Prod":[
            {
                "prod_id":"1",
                "prod_name":"螺丝刀",
                "prod_desc":"军用",
                "prod_unit":"只",
                "prod_price":"5",
                "quantity":"100"
            }
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
                "state":"0"
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
                "repo_id": "4",
                "state":"1"
            }
        ],
    }
```

#### "/api/client/index"

```json
POST:
{
    "type": "NEW_CUST",
    "data":{
        "cust_name": "刘七",
        "cust_email": "buf@bugg.edu.cn",
        "cust_co": "BUGG",
        "cust_address": "平安街",
        "cust_phone": "16763697568",
        "cust_icon": "...",
        "cust_wechat": "bilibili",
        "cust_qq": "123141131",
        "cust_duty":"经理",
        "cust_business_scope":"文化用品"
	}
}
PUT:
{
    "type": "EDIT_CUST",
    "data":{
        "cust_id": "6",
        //同POST
	}
}
GET:
{
    "Cust": [
        {
            "cust_id": "1",
            "cust_name": "张三",
            "cust_email": "bub@bucc.edu.cn",
            "cust_co": "东方红公司",
            "cust_address": "院学路",
            "cust_phone": "16763197268"
        }
    ],
    "Graph": [
        {
            "cust_name": "张三",
            "cust_orders": "50"
        }
    ]
}
```
#### "/api/client/${id}"

```json
GET:
{
        "cust_id": "6",
        "cust_name": "刘七",
        "cust_email": "buf@bugg.edu.cn",
        "cust_co": "BUGG",
        "cust_address": "平安街",
        "cust_phone": "16763697568",
        "cust_icon": logo,
        "cust_wechat": "bilibili",
        "cust_qq": "123141131",
        "cust_duty":"经理",
        "cust_business_scope":"文化用品",
        "Order": [
            {
                "order_id": "121212",
                "order_date": "2019-10-01",
                "state": "3",
                "order_info": "订单1"
            }
        ],
}
```



#### "/api/account"

```json
GET:
{
    "admin_id": "0001",
    "identity": "开发",
    "name": "developer",
    "admin_description":"一个程序员"
}
PUT:
{
	"type": "EDIT_ACCOUNT",
	"data": {
		"admin_id": "001",
		"name": "qs",
		"password": "adminadmin",
        "admin_icon":"data:image/png;base64,....",
        "admin_description":"一个小老板"
	}
}
```
#### "/api/login"

```json
POST:
{
    "username":"admin",
    "password":"admin",
    "remember":true
}
```
#### "/api/signup"

```json
POST:
{
    "email":"lzhmark@buaa.edu.cn",
    "username":"lzhmark",
    "phone_num":"15377766667",
    "password":"admin"
}
```
#### "/api/index"

```json
GET:
{
    "Messages": [//5
        {
            "admin_id": "3",
            "work_mess_info": "mess1"
        }
    ],
    "Repo": [//最多4个
        {
            "repo_id": "0",
            "name": "零号仓库",
            "repo_capacity": "120",
            "repo_occupy": "10"
        }
    ],
    "RepoMessIn": [//5
        {
            "repo_mess_id": "1",
            "repo_mess_info": "购入100个西瓜",
            "quantity": "100",
            "repo_id": "0",
            "repo_name": "零号仓库",
        }
    ],
    "RepoMessOut": [//5
        {
            "repo_mess_id": "4",
            "repo_mess_info": "售出100个水壶",
            "quantity": "100",
            "repo_id": "3",
            "repo_name": "三号仓库",
        }
    ],
    "RepoMessTrans": [//5
        {
            "trans_mess_id":"1",
            "repo_out_id": "2",
            "repo_out_name": "二号仓库",
            "repo_in_id": "1",
            "repo_in_name": "一号仓库",
            "quantity": "100",
            "prod_name": "笔记本电脑",
            "repo_mess_info": "日常清点移动"
        }
    ],
    "Graph": [//5个订单最多的
        {
            "cust_id": "1",
            "cust_name": "张三",
            "cust_orders": "50"
        }
    ]
}
```
#### "/api/userInfo"

```json
GET:{
        "name":"admin",
        "admin_icon":"data:image/png;base64,....",
        "admin_description":"一个程序员"
}
```

#### "/api/logout"

```json
POST:{}
```