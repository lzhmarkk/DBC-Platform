import React from 'react'
import {withAuth} from "../../Components/Common/AuthWrapper";

const Page = (props: any) => {
    return (
        <div>
            This is Dashboard
        </div>
    )
};

const PageDashBoard = withAuth(Page);
export default PageDashBoard;