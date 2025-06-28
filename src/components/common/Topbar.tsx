import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { Dropdown, type MenuProps } from 'antd';
import React from "react";

const Topbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const companyName = localStorage.getItem("company_name") ?? "Admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const items: MenuProps['items'] = [
    {
      key: "profile",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "settings",
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: "logout",
      label: (
        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <div className="px-3 py-4 bg-white shadow-md flex justify-between items-center text-xs relative">
      <div className="flex items-center text-gray-600 space-x-1">
        <Link to="/Dashboard" className="text-gray-800 font-medium text-base">
          <RiHome6Line />
        </Link>
        {pathSnippets.map((segment, index) => {
          const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
          return (
            <span key={url} className="flex items-center space-x-1">
              <MdOutlineNavigateNext className="text-gray-400 text-sm" />
              <Link to={url} className="capitalize text-purple-900">
                {segment}
              </Link>
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-4 pr-4">
        <IoNotifications size={18} />
        <Dropdown menu={{ items }} trigger={['click']}>
          <button className="flex items-center gap-1 text-gray-600 text-xs font-medium">
            {companyName} <FaChevronDown className="text-[10px]" />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
