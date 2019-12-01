export const getOption = (occupy: string, capacity: string, repository_name: string) => {
    return ({
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '占用率',
                type: 'gauge',
                detail: {formatter: '{value}%'},
                data: [{value: Math.floor(1000 * parseInt(occupy) / parseInt(capacity)) / 10, name: '占用率'}]
            }
        ]
    });
};

export const GenColumns = () => [
    {dataIndex: "repo_mess_info", title: "详情", key: "repo_mess_info"},
    {dataIndex: "prod_name", title: "产品名", key: "prod_name"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {
        dataIndex: "order_id", title: "订单号", key: "order_id",
        sorter: (a: any, b: any) => parseInt(a.order_id) - parseInt(b.order_id),
    },
];

export const GenColumnsTrans = () => [
    {dataIndex: "repo_mess_info", title: "详情", key: "repo_mess_info"},
    {dataIndex: "prod_name", title: "产品名", key: "prod_name"},
    {
        dataIndex: "quantity", title: "数量", key: "quantity",
        sorter: (a: any, b: any) => parseInt(a.quantity) - parseInt(b.quantity),
    },
    {dataIndex: "repo_in_name", title: "转入到", key: "repo_in_name"},
    {dataIndex: "repo_out_name", title: "转出到", key: "repo_out_name"},
];
export const genGraph = (prod_name: string[], quantity: string[]) => {
    return (
        {
            angleAxis: {
                type: 'category',
                data: prod_name,
                z: 10
            },
            title: {
                left: 'center',
                text: '仓库内产品数量图',
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            radiusAxis: {},
            polar: {},
            tooltip: {},
            series: [{
                type: 'bar',
                data: quantity,
                coordinateSystem: 'polar',
                name: '数量',
                stack: 'a'
            }],
            legend: {
                show: true,
                data: ['数量'],
                left: 'left',
            }
        });
};