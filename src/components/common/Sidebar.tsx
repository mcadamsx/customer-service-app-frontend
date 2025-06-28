import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import type { IconType } from "react-icons";
import logo1 from "../../assets/logo1.png";
import { FaAnglesLeft } from "react-icons/fa6";

interface RouteItem {
    name: string;
    path: string;
    icon: IconType;
}

interface SidebarProps {
    routes: RouteItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <div
            className={`h-screen bg-purple-900 text-white transition-all duration-300 ${
                collapsed ? "w-20" : "w-64"
            }`}
        >
            <div className="flex justify-center items-center p-4">
                <button onClick={() => setCollapsed(!collapsed)}>
                    <FaAnglesLeft
                        className={`transition-transform duration-300 ${
                            collapsed ? "rotate-180" : ""
                        }`}
                    />
                </button>
            </div>
           <div className="flex justify-center">
                <img
                    src={logo1}
                    alt="Customer Service"
                    className={`h-16 transition-all duration-300 ${
                        collapsed ? "scale-75" : "scale-100"
                    }`}
                />
            </div>

            <nav className="mt-6 flex flex-col items-center space-y-2 px-2">
                {routes.map(({ name, path, icon: Icon }) => (
                    <Link to={path} key={name} className="w-full">
                        <div
                            className={`flex items-center transition-all duration-200 px-4 py-3 rounded-lg hover:bg-purple-700 ${
                                location.pathname === path ? "bg-purple-800" : ""
                            } ${collapsed ? "justify-center" : "gap-3"}`}
                        >
                            <Icon className="text-lg" />
                            {!collapsed && (
                                <span className="text-sm">{name}</span>
                            )}
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
