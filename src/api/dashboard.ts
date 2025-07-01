import api from './client.ts';

// Optional: Define types if needed
export interface StatItem {
  count: number;
  change: number;
}

export interface DashboardStats {
  verifiedCustomers: StatItem;
  newCustomers: StatItem;
  openTickets: StatItem;
  subAdmins: StatItem;
}

// Helper function to get auth headers
const authHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchDashboardStats = async () => {
  const res = await api.get('/api/admin/dashboard-summary/', authHeaders());
  return res.data;
};

export const fetchRevenueData = async () => {
  const res = await api.get('/api/admin/revenue-analytics/', authHeaders());
  return res.data;
};

export const fetchCustomerActivity = async () => {
  const res = await api.get('/api/admin/customer-activity/', authHeaders());
  return res.data;
};

export const fetchCustomerLocations = async () => {
  const res = await api.get('/api/admin/customer-locations/', authHeaders());
  return res.data;
};
