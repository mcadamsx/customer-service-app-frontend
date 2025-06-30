import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from '../components/common/ProtectedRoute.tsx';
import CustomerDashboard from '../pages/Customer/CustomerDashboard.tsx';
import InvoicePage from '../components/common/InvoicePreview.tsx';
import CustomerSubscriptions from '../pages/Customer/CustomerSubscriptions.tsx';

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
  {
    path: "/customer-subscriptions",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CustomerSubscriptions />,
      }
    ]
  }
];

export default CustomerRoutes;
