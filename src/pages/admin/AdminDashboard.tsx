import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import RevenueChart from "../../components/common/RevenueChart.tsx";
import CustomerActivityChart from "../../components/common/CustomerActivityChart.tsx";
import CustomerLocationsDashboard from "../../components/common/CustomerLocationChart.tsx";
import {
  type DashboardStats,
  fetchCustomerActivity,
  fetchCustomerLocations,
  fetchDashboardStats,
  fetchRevenueData,
} from '../../api/dashboard.ts';



const AdminDashboard = () => {
  const companyName = localStorage.getItem("company_name") ?? "Admin";

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, revenueRes, activityRes, locationRes] = await Promise.all([
          fetchDashboardStats(),
          fetchRevenueData(),
          fetchCustomerActivity(),
          fetchCustomerLocations(),
        ]);

        setStats(statsRes);
        setRevenueData(revenueRes);
        setActivityData(activityRes);
        setLocationData(locationRes);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    loadData();
  }, []);

  const renderCard = (title: string, count: number, change: number) => {
    const isPositive = change >= 0;
    const ArrowIcon = isPositive ? FaArrowUp : FaArrowDown;

    return (
      <div className="bg-white shadow-md rounded-2xl p-4 items-center gap-4">
        <div className="border-b border-gray-300 w-full space-y-4">
          <h2 className="text-sm text-gray-600">{title}</h2>
          <div className="space-y-4 flex justify-between">
            <div>
              <p className="text-gray-900 text-2xl font-bold">{count}</p>
            </div>
            <div className={`${isPositive ? "text-green-600" : "text-red-700"} text-sm flex gap-2 mt-2`}>
              <ArrowIcon className="mt-0.5" />
              {isPositive ? "+" : ""}
              {change.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <span className="text-purple-900 flex gap-2 hover:underline font-semibold">
            View <FaArrowRightLong className="mt-1" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Hello, {companyName}</h1>
        <p className="text-gray-500">Here's an overview of your profile</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {renderCard("VERIFIED CUSTOMERS", stats?.verifiedCustomers?.count ?? 0, stats?.verifiedCustomers?.change ?? 0)}
        {renderCard("NEW CUSTOMERS", stats?.newCustomers?.count ?? 0, stats?.newCustomers?.change ?? 0)}
        {renderCard("OPEN TICKETS", stats?.openTickets?.count ?? 0, stats?.openTickets?.change ?? 0)}
        {renderCard("SUB-ADMINS", stats?.subAdmins?.count ?? 0, stats?.subAdmins?.change ?? 0)}
      </div>


      <div>
        <RevenueChart data={revenueData} />
        <div className="mt-6 flex space-x-6 justify-between w-full">
          <CustomerActivityChart data={activityData} />
          <CustomerLocationsDashboard data={locationData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
