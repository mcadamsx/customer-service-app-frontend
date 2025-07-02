import api from './client.ts';

export interface StatItem {
  count: number;
  percent_change: number;
}

export interface DashboardStats {
  verifiedCustomers: StatItem;
  newCustomers: StatItem;
  openTickets: StatItem;
  subAdmins: StatItem;
}

export interface RevenuePerService {
  service: string;
  revenue: number;
}

export interface RevenueData {
  total_revenue: number;
  revenue_growth_percent: number;
  revenue_per_service: RevenuePerService[];
}

export interface ActivityData {
  labels: string[];
  data: number[];
}

export interface CustomerLocation {
  city: string;
  count: number;
}

export interface LocationData {
  locations: CustomerLocation[];
}

const authHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get('/api/admin/dashboard-summary/', authHeaders());
  return res.data;
};

export const fetchRevenueData = async (): Promise<RevenueData> => {
  const res = await api.get('/api/admin/revenue-analytics/', authHeaders());
  return res.data;
};

export const fetchCustomerActivity = async (): Promise<ActivityData> => {
  const res = await api.get('/api/admin/customer-activity/', authHeaders());
  return res.data;
};

export const fetchCustomerLocations = async (): Promise<LocationData> => {
  const res = await api.get('/api/admin/customer-locations/', authHeaders());
  return res.data;
};
