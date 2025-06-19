import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";

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
];

export default AdminRoutes;
