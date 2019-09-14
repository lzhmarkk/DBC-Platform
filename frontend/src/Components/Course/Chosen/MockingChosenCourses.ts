const mockingChosenCourses = [
    ["001", "计算机组成", "12", "60", "200", "6", "核心专业"],
    ["003", "编译原理", "56", "34", "150", "3", "核心专业"],
    ["006", "面向对象", "78", "12", "240", "5", "核心专业"],
].map(e => ({
    Id: e[0],
    Name: e[1],
    Time: e[2],
    Person: e[3],
    Capacity: e[4],
    Score: e[5],
    Type: e[6],
}));
export default mockingChosenCourses;