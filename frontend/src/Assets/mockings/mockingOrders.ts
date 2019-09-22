import {IOrder} from "../../Components/Repository/interface";

const mockingOrders: IOrder[] = [
    ["4267138719", "2.4", "1", "1", "购入100箱苹果的订单"],
    ["9712034961", "2.7", "1", "1", "卖出50箱西瓜的订单"],
    ["5479321354", "2.28", "2", "1", "欠货10台iPad的订单"],
    ["7393058184", "1.30", "1", "1", "围巾原料的订单"],
    ["1040185931", "2.1", "4", "1", "员工用水杯的订单"],
    ["5516031932", "3.3", "1", "1", "碎纸机一批的订单"],
    ["5132495733", "1.3", "2", "1", "叉车10辆的订单"],
    ["1349526736", "3.15", "1", "1", "500箱纸巾的订单"],
    ["1946514383", "2.13", "1", "1", "一批计算机的订单"],
    ["1234548932", "2.24", "3", "1", "30桶原油的订单"],
    ["9876347693", "2.19", "3", "1", "1辆货车的订单"],
    ["5287411304", "2.20", "3", "1", "积木玩具一批共400箱的订单"]
].map(e => ({
    order_id: e[0],
    order_date: e[1],
    cust_id: e[2],
    state: e[3]
}));
export default mockingOrders;