import  { useState } from 'react';
import { FaPlusCircle, FaWpforms } from 'react-icons/fa';
import CustomTable from "../../components/common/Table.tsx";
import Button from "../../components/common/Button.tsx";
import Input from '../../components/common/Inputs.tsx';
import CustomModal from '../../components/common/Modal.tsx';
import SearchableSelect from '../../components/common/Select.tsx';
import { useNavigate } from 'react-router-dom';


const getStatusClass = (status: string): string => {
  switch (status) {
    case "Current":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-red-100 text-red-700";
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
    {status}
  </span>
    ),

  },
  { title: "Date Purchased", dataIndex: "datePurchased" },
  { title: "Expiry Date", dataIndex: "expiryDate" },
];

const paymentColumns = [
  { title: "Price", dataIndex: "price" },
  { title: "Service", dataIndex: "service" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
    {status}
  </span>
    ),
  },
  { title: "Date Purchased", dataIndex: "datePurchased" },
  { title: "Expiry Date", dataIndex: "expiryDate" },
];

const issueColumns = [
  { title: "Topic", dataIndex: "topic" },
  { title: "Product", dataIndex: "product" },
  { title: "Description", dataIndex: "description" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
        {status}
      </span>
    ),
  },
  { title: "Date Issued", dataIndex: "dateIssued" },
];

const subscriptions = [
  {
    key: 'sub-1',
    product: "Cloud Pro",
    service: "Storage",
    description: "100GB cloud storage",
    status: "Current",
    datePurchased: "2024-02-15",
    expiryDate: "2025-02-15"
  }
];

const payments = [
  {
    key: "pay-1",
    price: "GHS 3000.00",
    service: "Cloud Backup",
    status: "Current",
    datePurchased: "2024-05-01",
    expiryDate: "2025-05-01",
  },
  {
    key: "pay-2",
    price: "GHS 1200.00",
    service: "Firewall Protection",
    status: "Pending",
    datePurchased: "2024-06-10",
    expiryDate: "2025-06-10",
  },
  {
    key: "pay-3",
    price: "GHS 800.00",
    service: "VPN Access",
    status: "Failed",
    datePurchased: "2024-04-15",
    expiryDate: "2025-04-15",
  },
];


const issues = [
  {
    key: "issue-1",
    topic: "Access Denied",
    product: "Dashboard",
    description: "User unable to access dashboard",
    status: "Pending",
    dateIssued: "2024-06-01",
  }
];



const productOptions = [
  { value: 'microsoft-365', label: 'Microsoft 365' },
  { value: 'adobe-creative-cloud', label: 'Adobe Creative Cloud' },
  { value: 'google-workspace', label: 'Google Workspace' },
  { value: 'slack-premium', label: 'Slack Premium' },
  { value: 'zoom-pro', label: 'Zoom Pro' },
  { value: 'dropbox-business', label: 'Dropbox Business' },
  { value: 'atlassian-suite', label: 'Atlassian Suite' },
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'hubspot', label: 'HubSpot' },
  { value: 'notion-team', label: 'Notion Team' },
  { value: 'figma-professional', label: 'Figma Professional' },
  { value: 'canva-pro', label: 'Canva Pro' },
  { value: 'quickbooks-online', label: 'QuickBooks Online' },
  { value: 'aws-services', label: 'AWS Services' },
  { value: 'azure-services', label: 'Azure Services' },
  { value: 'other', label: 'Other' }
];

const serviceOptions = [
  { value: 'cloud-storage', label: 'Cloud Storage' },
  { value: 'email-services', label: 'Email Services' },
  { value: 'productivity-suite', label: 'Productivity Suite' },
  { value: 'communication-tools', label: 'Communication Tools' },
  { value: 'design-software', label: 'Design Software' },
  { value: 'accounting-software', label: 'Accounting Software' },
  { value: 'crm-system', label: 'CRM System' },
  { value: 'project-management', label: 'Project Management' },
  { value: 'cloud-hosting', label: 'Cloud Hosting' },
  { value: 'security-services', label: 'Security Services' },
  { value: 'analytics-tools', label: 'Analytics Tools' },
  { value: 'backup-services', label: 'Backup Services' },
  { value: 'development-tools', label: 'Development Tools' },
  { value: 'marketing-automation', label: 'Marketing Automation' },
  { value: 'video-conferencing', label: 'Video Conferencing' },
  { value: 'other', label: 'Other' }
];

const billingTypeOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semi-annual', label: 'Semi-Annual (6 months)' },
  { value: 'annual', label: 'Annual (Yearly)' },
  { value: 'one-time', label: 'One-time Payment' },
  { value: 'usage-based', label: 'Usage-based' },
  { value: 'per-user-monthly', label: 'Per User (Monthly)' },
  { value: 'per-user-annual', label: 'Per User (Annual)' }
];


const initialFormData = {
  product: '',
  dateIssued: '',
  service: '',
  billingType: '',
  description: ''
};

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'payments' | 'issues'>('subscriptions');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
const navigate = useNavigate();


  const companyName = localStorage.getItem("company_name") ?? "Admin";
  const companyEmail = localStorage.getItem("company_email") ?? "admin@example.com";

  const getTable = () => {
    switch (activeTab) {
      case 'subscriptions':
        return (
          <CustomTable
            title="Subscriptions"
            columns={subscriptionColumns}
            dataSource={subscriptions}
            rowKey="key"
          />
        );
      case 'payments':
        return (
          <CustomTable
            title="Payments"
            columns={paymentColumns}
            dataSource={payments}
            rowKey="key"
          />

        );
      case 'issues':
        return (
          <CustomTable
            title="Issue Reports"
            columns={issueColumns}
            dataSource={issues}
            rowKey="key"
          />
        );
    }
  };

  return (
    <div className="flex ">
    <div className="p-4 space-y-6 w-full">
      <div>
        <h1 className="text-4xl">Hello, {companyName}</h1>
        <p className="text-gray-600 text-sm">Here's an overview of your profile</p>
      </div>
      <div className="flex ">
        {['subscriptions', 'payments', 'issues'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as never)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab
                ? 'bg-purple-900 text-white'
                : 'bg-purple-100 text-purple-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <Input
          name="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="search"
          className="w-full md:w-72"
        />
        <div className="flex gap-2">
          {activeTab === 'subscriptions' && (
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-purple-900 text-white"
              onClick={openModal}
            >
              <FaPlusCircle />
              Add Subscription
            </Button>
          )}
          {activeTab === 'payments' && (
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-purple-900 text-white"
              onClick={() => navigate('/customer-invoice')}
            >
              <FaWpforms />
              Request Invoice
            </Button>

          )}

          {activeTab === 'issues' && (
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-purple-900 text-white"
              onClick={openModal}
            >
              <FaPlusCircle />
              Send Report
            </Button>
          )}

        </div>
      </div>
        <div className="w-full">
          {getTable()}
        </div>





      <CustomModal open={isModalOpen} onClose={closeModal} title="Add New Subscription">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SearchableSelect
            label="Product"
            name="product"
            options={productOptions}
            value={formData.product}
            onChange={(value) => setFormData({ ...formData, product: value })}
            required
          />
          <Input
            name="dateIssued"
            label="Date Issued"
            type="date"
            value={formData.dateIssued}
            onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })}
            required
          />
          <SearchableSelect
            label="Service"
            name="service"
            options={serviceOptions}
            value={formData.service}
            onChange={(value) => setFormData({ ...formData, service: value })}
            required
          />
          <SearchableSelect
            label="Billing Type"
            name="billingType"
            options={billingTypeOptions}
            value={formData.billingType}
            onChange={(value) => setFormData({ ...formData, billingType: value })}
            required
          />
        </div>
        <Input name="description" label="Description" placeholder="Enter description" textarea />
        <span className="flex justify-center text-sky-700 gap-1">
                <FaPlusCircle className="mt-1" />
                Add more
              </span>
        <div className="flex justify-center gap-2 mt-4">
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary">Add Subscription</Button>
        </div>
      </CustomModal>



    </div>
  <div className=" flex items-center  shadow-md justify-center bg-gray-200 p-6">
    <div className="  rounded-xl  flex flex-col items-center gap-4   max-w-md">
      <img
        src=""
        alt="Profile"
        className="w-24 h-24 rounded-full border"
      />
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">{companyName}</h2>
        <p className="text-gray-600">Email: {companyEmail}</p>
        <p className="text-gray-600">Phone: +233 558 3952</p>
        <span className="text-xs text-gray-500 italic">Admin Profile</span>
      </div>
    </div>
  </div>
    </div>
  );
};

export default CustomerDashboard;
