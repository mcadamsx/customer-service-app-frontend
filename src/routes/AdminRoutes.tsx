import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Subscriptions  from '../pages/admin/Subscriptions.tsx';

const AdminRoutes = [
    {
        path: "/Dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
        ],
    },
  {
    path: "/Subscriptions",
    element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Subscriptions />,
          }
        ]
  }
];

export default AdminRoutes;
