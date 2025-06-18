import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";

const AuthRoutes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/sign-up-admin",
        element: <SignUp />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
];

export default AuthRoutes;
