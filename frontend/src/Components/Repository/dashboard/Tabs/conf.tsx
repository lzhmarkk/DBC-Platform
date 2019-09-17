import MessageBox from "./messageBox";
import RepoMessIn from "./repoMessIn";
import RepoMessOut from "./repoMessOut";
import RepoMessTrans from "./repoMessTrans";

const RepoDetailTabs = [
    {
        name: "消息盒子",
        component: MessageBox
    },
    {
        name: "最近入库",
        component: RepoMessIn
    },
    {
        name: "最近出库",
        component: RepoMessOut
    },
    {
        name: "最近调库",
        component: RepoMessTrans
    },
];

export default RepoDetailTabs;