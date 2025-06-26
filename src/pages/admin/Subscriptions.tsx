import React, { useState } from 'react';
import { FaArrowDown, FaPlusCircle } from 'react-icons/fa';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import CustomTable from "../../components/common/Table.tsx";
import Button from "../../components/common/Button.tsx";
import Input from '../../components/common/Inputs.tsx';
import CustomModal from '../../components/common/Modal.tsx';
import SearchableSelect from '../../components/common/Select.tsx';
import { africanCountryOptions, ghanaRegionOptions } from '../../utils/Options.ts';

const ProductsColumn = [
  { title: "Product", dataIndex: "name" },
  { title: "No. of Services", dataIndex: "serviceCount" },
  { title: "Description", dataIndex: "description" },
  { title: "Vendor/Supplier", dataIndex: "vendor" },
  { title: "Created By", dataIndex: "createdBy" },
  { title: "Date Created", dataIndex: "dateCreated" },
  { title: "Country", dataIndex: "country" },
  { title: "Region", dataIndex: "region" },
];

const ServicesColumn = [
  { title: "Service", dataIndex: "service" },
  { title: "Product", dataIndex: "product" },
  { title: "Price", dataIndex: "price" },
  { title: "VAT", dataIndex: "vat" },
  { title: "Date Created", dataIndex: "dateCreated" },
  { title: "Region", dataIndex: "region" },
  { title: "Status", dataIndex: "status" },
  { title: "Expiry Date", dataIndex: "expireDate" },
];

const productData = [
  {
    key: "1",
    name: "Router X200",
    serviceCount: 3,
    description: "High-speed dual-band Wi-Fi router",
    vendor: "TechWave Ltd.",
    createdBy: "Kwame Admin",
    dateCreated: "2024-10-01",
    country: "Ghana",
    region: "Greater Accra",
  },
  {
    key: "2",
    name: "Firewall Pro",
    serviceCount: 2,
    description: "Enterprise-level firewall system",
    vendor: "SecureNet Solutions",
    createdBy: "Ama Admin",
    dateCreated: "2024-10-05",
    country: "Nigeria",
    region: "Lagos",
  },
  {
    key: "3",
    name: "Smart Switch 8-Port",
    serviceCount: 4,
    description: "Layer 2 managed switch",
    vendor: "NetLink Africa",
    createdBy: "Yaw Lentil",
    dateCreated: "2024-10-10",
    country: "Kenya",
    region: "Nairobi",
  },
];

const serviceData = [
  {
    key: "1",
    service: "Installation",
    product: "Router X200",
    price: "GHS 300",
    vat: "5%",
    dateCreated: "2024-10-03",
    region: "Greater Accra",
    status: "Active",
    expireDate: "2025-01-03",
  },
  {
    key: "2",
    service: "Configuration",
    product: "Firewall Pro",
    price: "GHS 500",
    vat: "10%",
    dateCreated: "2024-10-06",
    region: "Lagos",
    status: "Inactive",
    expireDate: "2024-12-31",
  },
  {
    key: "3",
    service: "Maintenance",
    product: "Smart Switch 8-Port",
    price: "GHS 150",
    vat: "7.5%",
    dateCreated: "2024-10-11",
    region: "Nairobi",
    status: "Active",
    expireDate: "2025-04-01",
  },
];

const Subscriptions: React.FC = () => {
  const [searchItem, setSearchItem] = useState("");
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    createdBy: "",
    region: "",
    vat: "",
    country: "",
    vendor: "",
    service: "",
    expireDate: "",
    price: "",
    dateCreated: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4 space-y-6">
      <div className="flex">
        <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-md font-medium ${activeTab === 'products' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'}`}>
          Products
        </button>
        <button onClick={() => setActiveTab('services')} className={`px-4 py-2 rounded-md font-medium ${activeTab === 'services' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'}`}>
          Services
        </button>
      </div>
      <div className="mb-6 mt-4 text-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <Input
          name="search"
          placeholder={`Search by ${activeTab === 'products' ? 'product, country...' : 'service, region...'}`}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          variant="search"
          className="w-full md:w-72"
        />
        <div className="flex items-center gap-2">
          {activeTab === 'services' && (
            <Button variant="secondary">
              Select filter <FaArrowDown />
            </Button>
          )}
          <Button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-900 text-white hover:bg-purple-800"
            onClick={openModal}
          >
            <FaPlusCircle />
            <span>Add New {activeTab === 'products' ? 'Product' : 'Service'}</span>
          </Button>
        </div>
      </div>
      {activeTab === 'products' ? (
        <CustomTable title="Products" columns={ProductsColumn} dataSource={productData} rowKey="key" />
      ) : (
        <CustomTable title="Services" columns={ServicesColumn} dataSource={serviceData} rowKey="key" />
      )}

      <CustomModal onClose={closeModal} open={isModalOpen} title={`Add New ${activeTab === 'products' ? 'Product' : 'Service'}`}>
        <div className="p-6 space-y-4">
          {activeTab === 'products' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="product" label="Product" placeholder="Enter Product" />
                <Input name="createdBy" label="Name" placeholder="Enter your name" />
                <SearchableSelect label="Region" name="region" options={ghanaRegionOptions} value={formData.region} onChange={(value) => setFormData({ ...formData, region: value })} required />
                <Input name="vat" label="VAT" placeholder="Optional" />
                <SearchableSelect label="Country" name="country" options={africanCountryOptions} value={formData.country} onChange={(value) => setFormData({ ...formData, country: value })} required />
                <Input name="vendor" label="Vendor/Supplier" placeholder="Enter vendor/supplier name" />
              </div>
              <Input name="description" label="Description" placeholder="Enter description" textarea />
              <span className="flex justify-center text-sky-700 gap-1">
                <FaPlusCircle className="mt-1" />
                Add more
              </span>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="service" label="Service" placeholder="Enter Service name" />
                <Input name="price" label="Price" placeholder="Enter your price" />
                <SearchableSelect label="Type of Product" name="region" options={ghanaRegionOptions} value={formData.region} onChange={(value) => setFormData({ ...formData, region: value })} required />
                <Input name="vat" label="VAT" placeholder="Optional" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Created</label>
                  <DatePicker
                    className="w-full"
                    value={formData.dateCreated ? dayjs(formData.dateCreated) : null}
                    onChange={(_, dateString) => setFormData({ ...formData, dateCreated: dateString as string })}
                    format="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <DatePicker
                    className="w-full"
                    value={formData.expireDate ? dayjs(formData.expireDate) : null}
                    onChange={(_, dateString) => setFormData({ ...formData, expireDate: dateString as string })}
                    format="YYYY-MM-DD"
                  />
                </div>
              </div>
              <span className="flex justify-center text-sky-700 gap-1">
                <FaPlusCircle className="mt-1" />
                Add more
              </span>
            </>
          )}

          <div className="flex justify-center gap-2 mt-4">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="primary">Add {activeTab === 'products' ? 'Product' : 'Service'}</Button>
          </div>

          {activeTab === 'services' && (
            <div className="flex text-center">
              <span className="text-purple-900 hover:underline hover:text-purple-800 text-sm">
                By clicking on this link, you will be redirected to Add Product Page
              </span>
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default Subscriptions;
