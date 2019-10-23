```javascript
前端接口（仅供参考）
export interface IRepo {
    repo_id: string
    place: string
    name: string
    admin_id: string
    repo_capacity: string
    repo_occupy: string
}

export interface IRepoMess {
    repo_mess_id: string
    repo_mess_info: string
    repo_id: string
    direction: string
    quantity: string
    prod_id: string
    order_id: string
}

export interface IWorkMess {
    work_mess_id: string
    work_mess_info: string
    admin_id: string
    direction: string
    quantity: string
    prod_id: string
    order_id: string
}

export interface IProd {
    prod_id: string
    prod_name: string
    prod_desc: string
}

export interface IOrder {
    order_id: string
    order_date: string
    cust_id: string
    state: string
}

export interface IRepoItem {
    repo_item: string,
    repo_id: string
    prod_id: string
    quantity: string
}
```
```json
url:"/api/repository/dashboard"
//后面为注释
GET:
{
    "Repo":[
        {
        	"repo_id":"1", //仓库id
        	"name":"零号仓库",//仓库名
        	"repo_capacity":"120",//容量
        	"repo_occupy":"10"//已使用
        },
        {
        	"repo_id":"2",
        	"name":"一号仓库",
        	"repo_capacity":"100",
        	"repo_occupy":"105"
        }
    ],
    "Messages":[
        {
            "admin_id":"1",//相关管理员id
            "work_mess_id":"3",//工作消息id
            "work_mess_info":"快去开飞机"//内容	
        }
    ],
    "RepoMessIn":[
        {
            "repo_mess_id":"1",//入库消息id
            "repo_mess_info":"购入100个西瓜",//入库消息
            "direction":"IN",//方向为IN
            "quantity":"100",//数量
            "prod_name":"西瓜",//对应产品名称
            "prod_id": "6",
            "repo_name":"零号仓库",//对应仓库名称
            "repo_id":"1"
        },
		{
            "repo_mess_id":"2",
            "repo_mess_info":"购入100个坦克",
            "direction":"IN",
            "quantity":"100",
            "prod_name":"坦克",
            "prod_id": "9",
            "repo_name":"三号仓库",
            "repo_id":"4"
        }
    ],
    "RepoMessOut",//同理 出库的"direction"为"OUT"
    "RepoMessTrans"(待补充)
}
```

```json
url:"/api/repository/in"
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
GET:
{
    "RepoMessIn":[
        {
                        "repo_mess_id": "1",//入库消息id
                        "repo_mess_info": "西瓜爆炸",//入库消息
                        "repo_name": "负一号仓库",//相关仓库名字
            			"repo_id":"1",//相关仓库id
           				"prod_name": "大西瓜炸弹",//产品名
                        "prod_id": "6",//产品id
                        "order_id": "12",//订单号
            			"quantity":"10",
            			"direction":"IN"
        },
        {
                        "repo_mess_id": "2",
                        "repo_mess_info": "东风快递来啦",
                        "repo_name": "秘密仓库",
            			"repo_id":"2",
                        "prod_name": "东风41",
             			"prod_id": "5",
                        "order_id": "2019",
            			"quantity":"1000",
            			"direction":"IN"
        }
    ],
    "Repo":[
        {
            "repo_id":"1",
        	"repo_name":"一号仓库"
        }
    ],
    "Prod":[
        {
            "prod_id":"3",
            "prod_name":"西瓜"
        }
    ],
    "Order":[
        {
            "order_id":"23425534534534"
        }
    ]
}
```

```json
url:"/api/repository/out"
//出库
//自行将in改成out
```

```json
url:"/api/repository/trans"
//调库
POST:
{
	"type":"NEW_MESS_TRANS",
	"data":{
		"repo_out_id":"3",//被调出的仓库id
		"prod_out_id":"4",//被调动的产品id
		"quantity_out":"3334",//数量
		"repo_mess_info":"我是描述",//描述
		"repo_in_id":"5",//被调入的仓库id
		"direction":"TRANS"//方向
	}
}
GET:
{
	"Repo":[
        {
			"repo_id":"1",//仓库id
			"name":"秘密仓库",//仓库名
			"PepoItem":[//仓库中含有的产品的信息
                {
					"prod_id":"3",//产品id
					"prod_name": "A380",//产品名字
					"quantity":"4"//存货数量
				},
				{
					"prod_id":"2",
					"prod_name": "737",
					"quantity":"2"
				}
			]
		}
    ]
}
```
