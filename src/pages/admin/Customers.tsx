import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import CustomTable from "../../components/common/Table";
import Button from "../../components/common/Button";
import Input from '../../components/common/Inputs';
import CustomModal from '../../components/common/Modal';


const CustomersList = [
  { title: "Customer Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Service", dataIndex: "service" },
  { title: "Date Purchased", dataIndex: "datePurchased" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === "Verified" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {status}
      </span>
    ),
  },
];

const mockCustomers = [
  {
    key: "1",
    name: "Tech Ghana Ltd",
    email: "info@techghana.com",
    service: "Premium Support",
    datePurchased: "2024-10-01",
    status: "Verified",
  },
  {
    key: "2",
    name: "Ama Seawater",
    email: "ama.serwaa@example.com",
    service: "Basic Plan",
    datePurchased: "2024-11-05",
    status: "Not Verified",
  },
];

const Customers: React.FC = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    datePurchased: "",
    status: "",
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: "",
      email: "",
      service: "",
      datePurchased: "",
      status: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAddCustomer = () => {
    closeModal();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Customer Management</h2>
        <Button
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-900 text-white hover:bg-purple-800"
          onClick={openModal}
        >
          <FaPlusCircle />
          <span>Add New Customer</span>
        </Button>
      </div>

      <Input
        name="search"
        placeholder="Search by name, email or service..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        variant="search"
        className="w-full md:w-72"
      />

      <CustomTable
        title="Customers"
        columns={CustomersList}
        dataSource={mockCustomers}
        rowKey="key"
      />

      <CustomModal onClose={closeModal} open={isModalOpen} title="Add New Customer">
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="name" label="Customer Name" placeholder="Enter full name or company" value={formData.name} onChange={handleInputChange} />
            <Input name="email" label="Email" placeholder="Enter email address" value={formData.email} onChange={handleInputChange} />
            <Input name="datePurchased" label="Date Purchased" type="date" value={formData.datePurchased} onChange={handleInputChange} />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCustomer}>Add Customer</Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Customers;
