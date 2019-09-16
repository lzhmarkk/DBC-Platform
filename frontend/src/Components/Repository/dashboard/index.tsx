import React from "react";

const getOption = (occupy: string, capacity: string, repository_name: string) => {
    return ({
        color: ["#ff7d00", "#b2c9de"],
        title: {
            text: repository_name,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: repository_name,
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                data: [
                    {value: parseInt(occupy), name: '占用'},
                    {value: parseInt(capacity) - parseInt(occupy), name: '空闲'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
};
export default getOption;