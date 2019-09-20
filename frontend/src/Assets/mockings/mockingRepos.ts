import {IRepo} from "../../Components/Repository/interface";

const mockingRepos:IRepo[] = [
    ["1", "东配楼负一层", "一号仓", "4", "10000", "500"],
    ["2", "东配楼一层", "二号仓", "1", "15000", "15000"],
    ["3", "主楼负一层", "三号仓", "3", "10000", "8000"],
    ["4", "4号楼负一层", "临时仓", "3", "1000", "0"],
    ["5", "4号楼二层", "后备仓", "3", "2000", "0"],
].map(e => ({
    repo_id: e[0],
    place: e[1],
    name: e[2],
    admin_id: e[3],
    repo_capacity: e[4],
    repo_occupy: e[5]
}));
export default mockingRepos;