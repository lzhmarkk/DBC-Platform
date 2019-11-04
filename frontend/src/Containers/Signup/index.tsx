import React, {useState} from "react";
import ISignupPanel from "../../Components/Signup";

const PageSignup = () => {
    const [form, setForm] = useState();
    const handleSubmit = (props:any) => {
    };
    return (
        <div>
            <ISignupPanel onSubmit={handleSubmit}/>
        </div>
    )
};
export default PageSignup;