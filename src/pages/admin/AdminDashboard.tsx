import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import RevenueChart, { type RevenueChartEntry } from '../../components/common/RevenueChart.tsx';
import CustomerActivityChart, { type ActivityDataEntry } from '../../components/common/CustomerActivityChart.tsx';
import CustomerLocationsDashboard, {
  type CustomerLocationData,
} from '../../components/common/CustomerLocationChart.tsx';

import {
  type DashboardStats,
  fetchUnifiedDashboardData, mapUnifiedDashboard,
} from '../../api/dashboard.ts';

const AdminDashboard = () => {
  const companyName = localStorage.getItem("company_name") ?? "Admin";

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activityData, setActivityData] = useState<ActivityDataEntry[]>([]);
  const [locationData, setLocationData] = useState<CustomerLocationData[]>([]);
  const [revenueChart, setRevenueChart] = useState<RevenueChartEntry[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const year = new Date().getFullYear();
        const raw = await fetchUnifiedDashboardData(year);
        const { dashboardStats, activityData, locationData, revenueChart } = mapUnifiedDashboard(raw);

        setStats(dashboardStats);
        setActivityData(activityData);
        setLocationData(locationData);
        setRevenueChart(revenueChart);

        console.log("Unified Stats:", dashboardStats);
        console.log("Revenue Chart:", revenueChart);
        console.log("Activity:", activityData);
        console.log("Locations:", locationData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };


    void loadData();
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
              {change.toFixed(2)}%
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
        {renderCard("VERIFIED CUSTOMERS", stats?.verifiedCustomers?.count ?? 0, stats?.verifiedCustomers?.percent_change ?? 0)}
        {renderCard("NEW CUSTOMERS", stats?.newCustomers?.count ?? 0, stats?.newCustomers?.percent_change ?? 0)}
        {renderCard("OPEN TICKETS", stats?.openTickets?.count ?? 0, stats?.openTickets?.percent_change ?? 0)}
        {renderCard("SUB-ADMINS", stats?.subAdmins?.count ?? 0, stats?.subAdmins?.percent_change ?? 0)}
      </div>

      <div>
        {revenueChart && <RevenueChart data={revenueChart} />}
        <div className="mt-6 flex space-x-6 justify-between w-full">
          {activityData && <CustomerActivityChart data={activityData} />}
          {locationData && <CustomerLocationsDashboard data={locationData} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
