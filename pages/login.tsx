import { NextPage } from "next";
import LoginComponentLayout from "../components/modules/login-module/login-layout";

const LoginPage : NextPage = () => {
    return(
        // <LoginComponentLayout/>
        
            <input type="text" className="w-80 p-4 dark" placeholder="hello"/>
        
    );
}

export default LoginPage;