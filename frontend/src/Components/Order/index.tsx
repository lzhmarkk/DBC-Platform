import React from "react";
import {Button, Tag} from "antd";

export const GenColumns = (Action: (props: { record: any }) => JSX.Element) => [
    {
        dataIndex: "order_id", title: "订单编号", key: "order_id",
        sorter: (a: any, b: any) => parseInt(a.order_id) - parseInt(b.order_id),
    },
    {dataIndex: "order_info", title: "订单详情", key: "order_info"},
    {
        dataIndex: "order_date", title: "订单时间", key: "order_date",
    },
    {
        dataIndex: "cust_name", title: "客户名", key: "cust_name",
        render: (_: any, a: any, ___: any) => <a href={`/client/${a.cust_id}`}>{a.cust_name}</a>
    },
    {dataIndex: "cust_co", title: "公司名", key: "cust_co",},
    {
        dataIndex: "Action", title: "查看更多", key: "Action",
        render: (_: any, record: any, ___: any) => <Action record={record}/>
    },
];

export const orderStates: any = {"1": "草稿", "2": "已签订", "3": "已付款", "4": "已完成", "5": "已取消"};

export const getButton = (props: { record: any }, handleClick: () => void) => {
    if (props.record.state == "1")
        return (<Button icon={'snippets'} type={"dashed"} onClick={handleClick}>
            {orderStates["1"]}
        </Button>);
    else if (props.record.state == "2") return (<Button icon={'edit'} onClick={handleClick}>
        {orderStates["2"]}
    </Button>);
    else if (props.record.state == "3") return (<Button icon={'check'} type={"primary"} ghost onClick={handleClick}>
        {orderStates["3"]}
    </Button>);
    else if (props.record.state == "4") return (
        <Button icon={'check-square'} type={"primary"} onClick={handleClick}>
            {orderStates["4"]}
        </Button>);
    else if (props.record.state == "5") return (<Button icon={'close'} type={"danger"} onClick={handleClick}>
        {orderStates["5"]}
    </Button>);
};

export const genTags = (state: string) => {
    const color = state === "1" ? "lime" : state == "2" ? "volcano" : state == "3" ? "geekblue" : state == "4" ? "green" : "red";
    return (
        <Tag color={color} key={state}>
            {orderStates[state]}
        </Tag>
    );
};

export const getGraph = (x: string[], y: string[], max: number) => {
    return ({
        title: {
            text: '订单数量图',
            subtext: '数据自动生成',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        legend: {
            data: ['订单量'],
            x: 'left'
        },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0]
            }
        ],
        grid: [{
            left: 50,
            right: 50,
        }],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {onZero: true},
                data: x
            }
        ],
        yAxis: [
            {
                name: '订单量',
                type: 'value',
                max: max
            }
        ],
        series: [
            {
                name: '订单量',
                type: 'line',
                symbolSize: 8,
                hoverAnimation: false,
                data: y
            },
        ]
    });
};

export const genProdColumns = () => [
    {
        dataIndex: "prod_id", title: "产品编号", key: "prod_id",
        sorter: (a: any, b: any) => parseInt(a.prod_id) - parseInt(b.prod_id),
    },
    {dataIndex: "prod_name", title: "产品名", key: "prod_name"},
    {dataIndex: "prod_desc", title: "产品描述", key: "prod_desc"},
    {dataIndex: "prod_unit", title: "单位", key: "prod_unit"},
    {
        dataIndex: "prod_price", title: "单价", key: "prod_price",
        sorter: (a: any, b: any) => parseInt(a.prod_price) - parseInt(b.prod_price),
    },
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    },
];

export const genProdGraph = (prod_name: string[], quantity: number[]) => {
    return ({
        title: {
            text: '订单产品图',
            subtext: '数据自动生成',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: prod_name
        },
        series:
            {
                name: '数量',
                type: 'bar',
                data: quantity
            }

    });
};

export const genRepoMessColumns = (direction: string) => [
    {
        dataIndex: "repo_mess_id", title: direction == "IN" ? "转入编号" : "转出编号", key: "repo_mess_id",
        sorter: (a: any, b: any) => parseInt(a.repo_mess_id) - parseInt(b.repo_mess_id),
    },
    {dataIndex: "repo_mess_info", title: direction == "IN" ? "转入详情" : "转出详情", key: "repo_mess_info"},
    {
        dataIndex: "prod_name", title: "产品", key: "prod_name",
        sorter: (a: any, b: any) => parseInt(a.prod_id) - parseInt(b.prod_id),
    },
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {
        dataIndex: "repo_name", title: "仓库名", key: "repo_name",
        sorter: (a: any, b: any) => parseInt(a.repo_id) - parseInt(b.repo_id),
        render: (_: any, a: any, ___: any) => <a href={`/repository/${a.repo_id}`}>{a.repo_name}</a>
    },
];