import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Input from '../../components/common/Inputs.tsx';
import SearchableSelect from '../../components/common/Select.tsx';
import PhoneInput from '../../components/common/PhoneInput.tsx';
import {
  africanCountryOptions,
  ghanaRegionOptions,
} from '../../utils/Options.ts';
import { getProfile } from '../../api/profile.ts';
import Toast from '../../components/common/ToastMessage';

interface FormData {
  address_1: string;
  address_2?: string;
  region: string;
  country: string;
  phone: string;
  prefix?: string;
  company_name: string;
  company_email: string;
  company_description?: string;
  profile_photo?: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'password'>('general');
  const [formData, setFormData] = useState<FormData>({
    address_1: '',
    region: '',
    country: '',
    phone: '',
    prefix: '+233',
    company_name: '',
    company_email: '',
    company_description: '',
    profile_photo: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        setFormData({
          address_1: profile.address1,
          region: profile.region,
          country: profile.country,
          phone: profile.phone,
          prefix: '+233',
          company_name: profile.company_name,
          company_email: profile.company_email,
          company_description: profile.company_description,
          profile_photo: profile.profile_photo,
        });
      } catch (err) {
        Toast.error("Failed to load profile data.");
        console.error(err);
      }
    })();
  }, []);


  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    Toast.success("Changes saved successfully!");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={formData.profile_photo ?? '/placeholder.jpg'}
            alt="Profile"
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{formData.company_name ?? 'Admin'}</h2>
            <p className="text-gray-600">Email: {formData.company_email}</p>
            <p className="text-gray-600">Phone: {formData.phone}</p>
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

      {/* Tabs */}
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

      {/* GENERAL TAB */}
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
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                {...(!isEditing && { disabled: true })}
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
                value={formData.company_email}
                onChange={(e) => setFormData({ ...formData, company_email: e.target.value })}
                disabled={!isEditing}
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

            <Input
              name="description"
              label="Company Description (in less than 25 words)"
              textarea
              value={formData.company_description}
              onChange={(e) => setFormData({ ...formData, company_description: e.target.value })}
              {...(!isEditing && { disabled: true })}
            />
          </form>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" disabled={!isEditing} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" disabled={!isEditing} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </>
      )}

      {activeTab === 'password' && (
        <>
        <form className="bg-white shadow-sm rounded-xl p-6 space-y-6 max-w-xl mx-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Change Password
            </h3>
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <FaEdit />
              Edit
            </Button>
          </div>

          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Enter current password"
            required
          />

          <Input
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            required
          />

          <Input
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            placeholder="Repeat new password"
            required
          />


        </form>
        <div className="flex justify-center gap-4">
        <Button variant="secondary" disabled={!isEditing} onClick={handleCancel}>
            Cancel
          </Button>
        <Button variant="primary" disabled={!isEditing} onClick={handleSave}>
          Save Changes
        </Button>
        </div>
        </>
      )}

    </div>
  );
};

export default Profile;
