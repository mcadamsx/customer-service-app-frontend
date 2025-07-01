import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar.tsx"
import {adminRoutes} from "../utils/SidebarRoutes.ts";
import Topbar from "../components/common/Topbar.tsx";

const DashboardLayout = () => {

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar routes={adminRoutes} />

            <div className="flex flex-col flex-1">
                <Topbar />

                <main className="flex-1 overflow-auto bg-gray-100 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
