import RepoMessIn from "./repoMessIn";
import RepoMessOut from "./repoMessOut";
import RepoMessTrans from "./repoMessTrans";

const RepoDetailTabs = [
    {
        name: "入库",
        component: RepoMessIn
    },
    {
        name: "出库",
        component: RepoMessOut
    },
    {
        name: "调配",
        component: RepoMessTrans
    },
];

export default RepoDetailTabs;