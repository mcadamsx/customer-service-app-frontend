import React, { useState } from 'react';
import { FaArrowDown, FaPlusCircle } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DatePicker, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import CustomTable from '../../components/common/Table.tsx';
import Button from '../../components/common/Button.tsx';
import Input from '../../components/common/Inputs.tsx';
import CustomModal from '../../components/common/Modal.tsx';
import SearchableSelect from '../../components/common/Select.tsx';

// Define status as a union type for better type safety
type SubscriptionStatus = 'Current' | 'Pending' | 'Expired' | 'Unsubscribed';

// Define billing type options
type BillingType = 'Monthly' | 'Annual' | 'One-time' | 'Quarterly';

interface ProductEntry {
  key: string;
  product: string;
  service: string;
  billingType: BillingType;
  description: string;
  status: SubscriptionStatus;
  dateIssued: string | null;
  expireDate: string | null;
}

interface FormData {
  product: string;
  dateIssued: string | null;
  service: string;
  billingType: BillingType;
  description: string;
  status: SubscriptionStatus;
  expireDate: string | null;
}

// Define menu action types
type MenuAction = 'subscribe' | 'unsubscribe' | 'view';

const initialData: ProductEntry[] = [
  {
    key: '1',
    product: 'Router X200',
    service: 'Installation',
    billingType: 'Annual',
    description: 'Wi-Fi router setup',
    status: 'Current',
    dateIssued: '2025-06-01',
    expireDate: '2026-06-01',
  },
  {
    key: '2',
    product: 'Firewall Pro',
    service: 'Configuration',
    billingType: 'Monthly',
    description: 'Firewall security setup',
    status: 'Unsubscribed',
    dateIssued: '2025-05-10',
    expireDate: '2026-05-10',
  },
];

const CustomerSubscriptions: React.FC = () => {
  const [data, setData] = useState<ProductEntry[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    product: '',
    dateIssued: null,
    service: '',
    billingType: 'Monthly',
    description: '',
    status: 'Current',
    expireDate: null,
  });

  const handleMenuClick = (record: ProductEntry, action: MenuAction): void => {
    message.info(`${action} clicked for ${record.product}`);
  };

  const handleAddEntry = (): void => {
    const newEntry: ProductEntry = {
      key: `${Date.now()}`,
      product: formData.product,
      service: formData.service,
      billingType: formData.billingType,
      description: formData.description,
      status: formData.status,
      dateIssued: formData.dateIssued,
      expireDate: formData.expireDate,
    };

    setData((prev: ProductEntry[]) => [...prev, newEntry]);
    message.success('Subscription added successfully');
    closeModal();
    resetFormData();
  };

  const resetFormData = (): void => {
    setFormData({
      product: '',
      dateIssued: null,
      service: '',
      billingType: 'Monthly',
      description: '',
      status: 'Current',
      expireDate: null,
    });
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSelectChange = (field: keyof FormData) => (value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange =
    (field: 'dateIssued' | 'expireDate') =>
    (_date: Dayjs | null, dateString: string | string[]): void => {
      setFormData((prev) => ({
        ...prev,
        [field]: Array.isArray(dateString) ? dateString[0] : dateString,
      }));
    };

  const columns: ColumnsType<ProductEntry> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service'
    },
    {
      title: 'Billing Type',
      dataIndex: 'billingType',
      key: 'billingType'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: SubscriptionStatus) => {
        const badgeStyles: Record<SubscriptionStatus, string> = {
          Current: 'bg-green-100 text-green-700',
          Pending: 'bg-yellow-100 text-yellow-700',
          Expired: 'bg-red-100 text-red-700',
          Unsubscribed: 'bg-gray-200 text-gray-700',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[status]}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: 'Date Issued',
      dataIndex: 'dateIssued',
      key: 'dateIssued',
      render: (date: string | null) => <span>{date ?? '-'}</span>,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expireDate',
      key: 'expireDate',
      render: (date: string | null) => (
        <span className="text-red-600">{date ?? '-'}</span>
      ),
    },
    {
      title: '',
      key: 'actions',
      render: (_, record: ProductEntry) => {
        const isUnsubscribed = record.status === 'Unsubscribed';

        const items: MenuProps['items'] = [
          {
            key: isUnsubscribed ? 'subscribe' : 'unsubscribe',
            label: isUnsubscribed ? 'Subscribe' : 'Unsubscribe',
            onClick: () =>
              handleMenuClick(
                record,
                isUnsubscribed ? 'subscribe' : 'unsubscribe'
              ),
          },
          {
            key: 'view',
            label: 'View Details',
            onClick: () => handleMenuClick(record, 'view'),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <button
              type="button"
              className="text-xl text-gray-500 hover:text-gray-800"
              aria-label="More actions"
            >
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        );
      },
    },
  ];

  const filteredData = data.filter((item: ProductEntry) =>
    Object.values(item).some(
      (value: unknown) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchItem.toLowerCase())
    )
  );

  const closeModal = (): void => setIsModalOpen(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setSearchItem(e.target.value);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-3 items-start md:items-center">
        <Input
          name="search"
          placeholder="Search by product, service, description..."
          value={searchItem}
          onChange={handleSearchChange}
          variant="search"
          className="w-full md:w-72"
        />
        <div className="flex gap-2">
          <Button variant="secondary">
            <span>Select Filter</span> <FaArrowDown />
          </Button>
          <Button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-900 text-white hover:bg-purple-800"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusCircle />
            <span>Add New Subscription</span>
          </Button>
        </div>
      </div>

      <CustomTable<ProductEntry>
        title="Subscriptions"
        columns={columns}
        dataSource={filteredData}
        rowKey="key"
      />


      <CustomModal onClose={closeModal} open={isModalOpen} title="New Subscription">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="product"
            label="Product"
            placeholder="Enter Product name"
            value={formData.product}
            onChange={handleInputChange('product')}
            required
          />


            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Issued
            </label>
            <DatePicker
              className="w-full"
              value={formData.dateIssued ? dayjs(formData.dateIssued) : null}
              onChange={handleDateChange('dateIssued')}
              format="YYYY-MM-DD"
              placeholder="Select date issued"
            />


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
              { value: 'One-time', label: 'One-time' }
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
          onClick={() => {/* Add logic for adding more fields */}}
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

export default CustomerSubscriptions;