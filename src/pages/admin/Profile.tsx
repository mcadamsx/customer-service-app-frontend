import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Input from '../../components/common/Inputs.tsx';
import SearchableSelect from '../../components/common/Select.tsx';
import {
  africanCountryOptions,
  ghanaRegionOptions,
} from '../../utils/Options.ts';
import PhoneInput from '../../components/common/PhoneInput.tsx';

interface FormData {
  address_1: string;
  address_2?: string;
  region: string;
  country: string;
  phone: string;
  prefix?: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'password'>('general');

  const companyName = localStorage.getItem("company_name") ?? "Admin";
  const companyEmail = localStorage.getItem("company_email") ?? "admin@example.com";

  const [formData, setFormData] = useState<FormData>({
    address_1: '',
    region: '',
    country: '',
    phone: '',
    prefix: '+233',
  });

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src=""
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{companyName}</h2>
            <p className="text-gray-600">Email: {companyEmail}</p>
            <p className="text-gray-600">Phone: +233 558 3952</p>
            <span className="text-xs text-gray-500 italic">Admin Profile</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex justify-center gap-2">
          <Button variant="primary">Change Photo</Button>
          <span className="text-red-600 mt-2 hover:underline cursor-pointer">
            Remove Photo
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-6 py-2 rounded-md font-medium ${
            activeTab === 'general' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`px-6 py-2 rounded-md font-medium ${
            activeTab === 'password' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'
          }`}
        >
          Password
        </button>
      </div>

      {activeTab === 'general' && (
        <>
          <form className="bg-white shadow-sm rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h3>
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                <FaEdit />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="fullName"
                label="Full Name"
                {...(!isEditing && { disabled: true })}
                defaultValue={companyName}
                placeholder="Enter full name"
              />

              <SearchableSelect
                label="Country"
                name="country"
                options={africanCountryOptions}
                value={formData.country}
                onChange={(value) => setFormData({ ...formData, country: value })}
                required
                {...(!isEditing && { disabled: true })}
              />

              <Input
                type="email"
                name="companyEmail"
                label="Email"
                {...(!isEditing && { disabled: true })}
                defaultValue={companyEmail}
                placeholder="Enter email address"
              />

              <SearchableSelect
                label="Region"
                name="region"
                options={ghanaRegionOptions}
                value={formData.region}
                onChange={(value) => setFormData({ ...formData, region: value })}
                required
                {...(!isEditing && { disabled: true })}
              />

              <PhoneInput
                prefix={formData.prefix ?? '+233'}
                phone={formData.phone}
                onPrefixChange={(prefix) => setFormData({ ...formData, prefix })}
                onPhoneChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                {...(!isEditing && { disabled: true })}
              />

              <Input
                label="Address"
                name="address_1"
                placeholder="Enter your address"
                value={formData.address_1}
                onChange={(e) => setFormData({ ...formData, address_1: e.target.value })}
                required
                {...(!isEditing && { disabled: true })}
              />
            </div>
          </form>
          <Input name="description" label="Company Description(in less than 25 words)" {...(!isEditing && { disabled: true })} textarea />


          <div className="flex justify-end gap-4">
            <Button variant="secondary" disabled={!isEditing}>
              Cancel
            </Button>
            <Button variant="primary" disabled={!isEditing}>
              Save Changes
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
