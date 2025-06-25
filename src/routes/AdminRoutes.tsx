import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Subscriptions from "../pages/admin/Subscriptions";
import ProtectedRoute from '../components/common/ProtectedRoute.tsx';

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
];

export default AdminRoutes;
