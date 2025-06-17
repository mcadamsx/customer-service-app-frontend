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
            // more nested admin pages can go here
        ],
    },
];

export default AdminRoutes;
