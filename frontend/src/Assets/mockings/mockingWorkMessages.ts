const mockingWorkMessages = [
    ["1", "开飞机", "1", "IN", "100", "3", "5"],
    ["2", "开坦克", "2", "IN", "300", "2", "1"],
    ["3", "开汽车", "1", "OUT", "100", "2", "2"],
].map(
    e => ({
        work_mess_id: e[0],
        work_mess_info: e[1],
        admin_id: e[2],
        direction: e[3],
        quantity: e[4],
        prod_id: e[5],
        order_id: e[6]
    })
);
export default mockingWorkMessages;