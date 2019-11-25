import React from "react";
import {withAuth} from "../../Components/Common/AuthWrapper";

const Page = () => {
    return (
        <div>
            <h3>联系</h3>
            刘子航
            <strong>15377766667</strong>
        </div>
    )
};

const PageHelp = withAuth(Page);
export default PageHelp;