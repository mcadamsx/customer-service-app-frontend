// utils/sidebarRoutes.ts
import { MdDashboard, MdGroups } from "react-icons/md";
import { FaExclamationCircle, FaHandshake, FaIdCard, FaStar, FaUser, FaWallet} from "react-icons/fa";
import {RiHandCoinFill} from "react-icons/ri";

export const adminRoutes = [
    { name: "Dashboard", path: "/Dashboard", icon: MdDashboard  },
    { name: "Subscriptions", path: "/subscriptions", icon: FaStar },
    { name: "Users", path: "/admin/users", icon: FaUser },
    { name: "Customers", path: "/customers", icon: RiHandCoinFill},
    { name: "Employees", path: "/employees", icon: MdGroups },
    { name: "Roles", path: "/roles", icon: FaIdCard },
    { name: "CRM", path: "/crm", icon: FaHandshake  },
    {name : "Issues", path: "/issues", icon: FaExclamationCircle },
    { name: "Payments", path: "/payments", icon: FaWallet },
];

export const userRoutes = [
    { name: "My Dashboard", path: "/dashboard", icon: MdDashboard },
];
