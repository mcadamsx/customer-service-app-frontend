import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Subscriptions from "../pages/admin/Subscriptions";
import Customers from '../pages/admin/Customers.tsx';
import CustomerDetails from '../pages/admin/CustomerDetails.tsx';
import ProtectedRoute from '../components/common/ProtectedRoute.tsx';
import Profile from '../pages/admin/Profile.tsx';

const AdminRoutes = [
  {
    path: "/Dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/Subscriptions",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Subscriptions />,
      },
    ],
  },
  {
    path: "/Customers",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Customers />,
      },
      {
        path: ":id",
        element: <CustomerDetails />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
];

export default AdminRoutes;
