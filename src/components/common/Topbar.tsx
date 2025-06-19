import { Link, useLocation } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const Topbar = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split("/").filter(i => i);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="px-3 py-4 bg-white shadow-md flex justify-between items-center text-xs relative">
            {/* Breadcrumbs */}
            <div className="flex items-center text-gray-600 space-x-1">
                <Link to="/admin" className="text-gray-800 font-medium text-base">
                    <RiHome6Line />
                </Link>
                {pathSnippets.map((segment, index) => {
                    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
                    return (
                        <span key={url} className="flex items-center space-x-1">
                            <MdOutlineNavigateNext className="text-gray-400 text-sm" />
                            <Link to={url} className="capitalize text-purple-900">{segment}</Link>
                        </span>
                    );
                })}
            </div>

            {/* Right-side: Notification + User */}
            <div className="flex items-center gap-4 relative pr-4">
                <span><IoNotifications size={18} /></span>

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-1 text-gray-600 text-xs font-medium focus:outline-none"
                    >
                        MTN GH... <FaChevronDown className="text-[10px]" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white  rounded shadow-md text-gray-700 text-sm z-50">
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                            <button
                                onClick={() => {
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
