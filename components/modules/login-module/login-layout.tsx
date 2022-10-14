import AuthLayoutComponent from "../../layouts/auth-layout";
import { LoginForm } from "./login-form";

const LoginComponentLayout = () : JSX.Element => {
    return(
        <AuthLayoutComponent>
            <LoginForm/>
        </AuthLayoutComponent>
    );
}

export default LoginComponentLayout;