import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaPlusCircle } from 'react-icons/fa';
import Button from '../../components/common/Button.tsx';
import CustomModal from '../../components/common/Modal.tsx';
import Input from '../../components/common/Inputs.tsx';
import { DatePicker, message } from 'antd';
import  { Dayjs } from 'dayjs';
import SearchableSelect from '../../components/common/Select.tsx';

const demoData = [
  {
    key: '1',
    description:
      'The Wi-Fi router setup includes the installation and configuration of Router X200 for optimal network performance. This service ensures secure connectivity, proper placement for signal coverage, and initial troubleshooting support to guarantee a smooth and stable internet experience.',
  },
  {
    key: '2',
    description: 'Firewall security setup',
  },
];

const SubscriptionDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [formData, setFormData] = useState({
    product: '',
    dateIssued: null as Dayjs | null,
    expireDate: null as Dayjs | null,
    service: '',
    billingType: 'Monthly',
    description: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const Admin = localStorage.getItem('company_name') ?? 'John Doe';

  useEffect(() => {
    const subscription = demoData.find((item) => item.key === id);
    setDescription(subscription?.description || 'No description available.');
  }, [id]);

  const handleInputChange =
    (field: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleSelectChange =
    (field: keyof typeof formData) =>
      (value: string) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

  const handleDateChange = (field: 'dateIssued' | 'expireDate') => (
    date: Dayjs | null
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleAddEntry = () => {
    message.success('New subscription added (not yet saved to backend)');
    setIsModalOpen(false);
    setFormData({
      product: '',
      dateIssued: null,
      expireDate: null,
      service: '',
      billingType: 'Monthly',
      description: '',
    });
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="mx-auto">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex gap-2">
            <span
              className="text-purple-700 text-xl hover:underline cursor-pointer"
              onClick={() => navigate('/customer-subscriptions')}
            >
              Subscriptions
            </span>
            <span className="mt-2">
              <FaChevronRight />
            </span>
            <span className="mt-1 text-gray-500 font-medium">
              Network Details
            </span>
          </div>
          <Button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-900 text-white hover:bg-purple-800"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusCircle />
            <span>Add New Subscription</span>
          </Button>
        </div>

        <div className="p-6 rounded-xl bg-white shadow">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {description}
          </p>
          <div className="flex gap-6 mt-8 items-center">
            <p className="text-sm text-gray-600">Created by</p>
            <div className="flex items-center gap-3">
              <img
                src="/path-to-profile.jpg" // Replace with actual path
                alt="Admin profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium text-gray-800">{Admin}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        onClose={closeModal}
        open={isModalOpen}
        title="New Subscription"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="product"
            label="Product"
            placeholder="Enter Product name"
            value={formData.product}
            onChange={handleInputChange('product')}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Issued
            </label>
            <DatePicker
              className="w-full"
              value={formData.dateIssued}
              onChange={handleDateChange('dateIssued')}
              format="YYYY-MM-DD"
              placeholder="Select date issued"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expire Date
            </label>
            <DatePicker
              className="w-full"
              value={formData.expireDate}
              onChange={handleDateChange('expireDate')}
              format="YYYY-MM-DD"
              placeholder="Select expire date"
            />
          </div>
          <Input
            name="service"
            label="Service"
            placeholder="Enter Service name"
            value={formData.service}
            onChange={handleInputChange('service')}
            required
          />
          <SearchableSelect
            label="Billing Type"
            name="billingType"
            options={[
              { value: 'Monthly', label: 'Monthly' },
              { value: 'Annual', label: 'Annual' },
              { value: 'Quarterly', label: 'Quarterly' },
              { value: 'One-time', label: 'One-time' },
            ]}
            value={formData.billingType}
            onChange={handleSelectChange('billingType')}
            required
          />
        </div>

        <div className="mt-4">
          <Input
            name="description"
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange('description')}
            textarea
          />
        </div>

        <button
          type="button"
          className="flex justify-center text-sky-700 gap-1 w-full mt-4 hover:text-sky-800"
          onClick={() => {}}
        >
          <FaPlusCircle className="mt-1" />
          Add more
        </button>

        <div className="flex justify-center gap-2 mt-6">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Submit
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default SubscriptionDetails;