import api from './client.ts';
import type { RevenueChartEntry } from '../components/common/RevenueChart.tsx';
import type { ActivityDataEntry } from '../components/common/CustomerActivityChart.tsx'
import type { CustomerLocationData } from '../components/common/CustomerLocationChart.tsx'

export interface StatItem {
  count: number;
  percent_change: number;
}

export interface UnifiedDashboardResponse {
  stats: {
    verified_customers: StatItem;
    new_customers: StatItem;
    open_tickets: StatItem;
    sub_admins: StatItem;
  };
  revenue_chart_data: {
    name: string;
  }[];
  customer_activity: {
    months: string[];
    counts: number[];
  };
  top_locations: {
    country: string;
    percentage: number;
  }[];
}

export interface DashboardStats {
  verifiedCustomers: StatItem;
  newCustomers: StatItem;
  openTickets: StatItem;
  subAdmins: StatItem;
}
const authHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchUnifiedDashboardData = async (
  year: number
): Promise<UnifiedDashboardResponse> => {
  try {
    const res = await api.get(`/api/admin/dashboard/?year=${year}`, authHeaders());
    return res.data;
  } catch (error) {
    console.error("Error fetching unified dashboard data:", error);
    throw new Error("Failed to fetch unified dashboard data");
  }
};

export const mapUnifiedDashboard = (data: UnifiedDashboardResponse) => {
  const dashboardStats: DashboardStats = {
    verifiedCustomers: data.stats.verified_customers,
    newCustomers: data.stats.new_customers,
    openTickets: data.stats.open_tickets,
    subAdmins: data.stats.sub_admins,
  };

  const activityData: ActivityDataEntry[] = data.customer_activity.months.map((month, index) => ({
    name: month,
    activity: data.customer_activity.counts[index],
  }));


  const COLORS = ['#6B46C1', '#8B5CF6', '#A78BFA', '#C4B5FD'];

  const locationData: CustomerLocationData[] = data.top_locations.map((item, index) => ({
    name: item.country,
    value: item.percentage,
    customers: Math.round(item.percentage * 100),
    color: COLORS[index % COLORS.length],
  }));

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const revenueChart: RevenueChartEntry[] = data.revenue_chart_data.map((month) => ({
    name: month.name,
    Tablet: getRandomInt(1000, 8000),
    Internet:getRandomInt(1000, 8000),
    Voice: getRandomInt(1000, 8000),
  }));

  return {
    dashboardStats,
    activityData,
    locationData,
    revenueChart,
  };
};
