import api from "./client.ts"

export interface Profile {
  company_name: string;
  company_email: string;
  address1: string;
  region: string;
  country: string;
  phone: string;
  profile_photo: string;
  company_description: string;
}

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get<Profile>('/api/admin/profile/');
  return response.data;
};