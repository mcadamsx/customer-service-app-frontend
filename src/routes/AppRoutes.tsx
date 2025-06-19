import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
    const routes = useRoutes([...AuthRoutes, ...AdminRoutes]);
    return routes;
};

export default AppRoutes;
