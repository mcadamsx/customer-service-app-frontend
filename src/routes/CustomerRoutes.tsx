import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from '../components/common/ProtectedRoute.tsx';
import CustomerDashboard from '../pages/Customer/CustomerDashboard.tsx';
import InvoicePage from '../components/common/InvoicePreview.tsx';

const CustomerRoutes = [
  {
    path: "/customer-dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CustomerDashboard />,
      },
    ],
  },
  {
    path: "/customer-invoice",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <InvoicePage />,
      },
    ],
  },
];

export default CustomerRoutes;
