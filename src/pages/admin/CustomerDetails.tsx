import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronRight, FaEnvelope } from 'react-icons/fa';
import Button from "../../components/common/Button.tsx";
import CustomTable from '../../components/common/Table.tsx';

const mockCustomers = [
  {
    key: "1",
    name: "Carlos Nelson",
    email: "carlos.nelson@gmail.com",
    phone: "+233 558 3952",
    service: "Premium Support",
    datePurchased: "2024-10-01",
    status: "Verified",
  },
];

const mockSubscriptions = [
  {
    key: "sub-1",
    product: "Premium Plan",
    service: "Cloud Storage",
    description: "100GB cloud storage access",
    status: "current",
    datePurchased: "2024-01-10",
    expiryDate: "2025-01-10",
  },
];

const mockIssues = [
  {
    key: "issue-1",
    topic: "Login Error",
    service: "Customer Portal",
    description: "Cannot login with valid credentials",
    dateIssued: "2024-11-20",
    status: "pending",
  },
];

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "current":
    case "open":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
    case "closed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

const subscriptionColumns = [
  { title: "Product", dataIndex: "product" },
  { title: "Service", dataIndex: "service" },
  { title: "Description", dataIndex: "description" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    ),
  },
  { title: "Date Purchased", dataIndex: "datePurchased" },
  { title: "Expiry Date", dataIndex: "expiryDate" },
];

const issueColumns = [
  { title: "Topic", dataIndex: "topic" },
  { title: "Service", dataIndex: "service" },
  { title: "Description", dataIndex: "description" },
  { title: "Date Issued", dataIndex: "dateIssued" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    ),
  },
];

const CustomerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const customer = mockCustomers.find((c) => c.key === id);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'issues'>('subscriptions');

  if (!customer) {
    return <div className="p-4 text-red-600">Customer not found.</div>;
  }

  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <nav className="text-sm text-gray-500 flex  space-x-2">
          <Link to="/Customers" className="text-purple-700 font-medium hover:underline">
            Customers
          </Link>
          <span className="mt-1"><FaChevronRight  /></span>
          <span>Customer Details</span>
        </nav>
        <Button variant="primary">
          <span className="flex gap-2">
            <FaEnvelope className="mt-1" />
            Reinvite Customer
          </span>
        </Button>
      </div>

      <div className="bg-white rounded-md p-8 flex flex-col items-center shadow-sm space-y-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-semibold text-gray-600">
          {initials}
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
          <p className="text-gray-600">Email: {customer.email}</p>
          <p className="text-gray-600">Phone: {customer.phone}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'subscriptions'
              ? 'bg-purple-900 text-white'
              : 'bg-purple-100 text-purple-900'
          }`}
        >
          Subscriptions
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'issues'
              ? 'bg-purple-900 text-white'
              : 'bg-purple-100 text-purple-900'
          }`}
        >
          Issues
        </button>
      </div>

      {activeTab === 'subscriptions' ? (
        <CustomTable
          title="Subscriptions"
          columns={subscriptionColumns}
          dataSource={mockSubscriptions}
          rowKey="key"
        />
      ) : (
        <CustomTable
          title="Issues"
          columns={issueColumns}
          dataSource={mockIssues}
          rowKey="key"
        />
      )}
    </div>
  );
};

export default CustomerDetails;
