import AuthLayout from "../../layouts/AuthLayout.tsx";
import LoginForm from "../../components/auth/LoginForm.tsx";
import LoginLeftPanel from "../../components/auth/LeftPanel.tsx";


const Login = () => {
    return (
        <AuthLayout rightContent={<LoginForm />} leftContent={<LoginLeftPanel />} />
    );
};

export default Login;
