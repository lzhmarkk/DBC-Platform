import {ICustomer} from "../../Components/Repository/interface";

const mockingCustomers: ICustomer[] = [
    ["1", "张三", "zhangsan@11.com", "北京市昌平"],
    ["2", "李四", "lisi@11.com", "上海市虹桥"],
    ["3", "王五", "wangwu@sina.com", "深圳市保安"],
    ["4", "大飞机有限公司", "bigplane@buaa.com", "广州市白云"],
    ["5", "新时代塑料厂", "newArea@163.com", "武汉市江汉"],
    ["6", "满荣辣条厂", "manrong123@sina.com", "广州市番禺"],
].map(e => ({
    cust_id: e[0],
    cust_name: e[1],
    cust_email: e[2],
    cust_address: e[3],
}));
export default mockingCustomers;