import type { AxiosError } from 'axios';
import api from './client.ts';

export interface CustomerRegisterPayload {
  token: string;
  company_name: string;
  company_email: string;
  password: string;
  repeat_password: string;
  address1: string;
  address2?: string;
  region: string;
  country: string;
  phone: string;
}

export interface CustomerRegisterResponse {
  message: string;
  data?: {
    id: string;
    company_name: string;
    company_email: string;
  };
}

export const registerCustomer = async (
  payload: CustomerRegisterPayload
): Promise<CustomerRegisterResponse> => {
  const response = await api.post("/api/admin/register/", payload);
  return response.data;
};


export interface LoginPayload {
  company_email: string;
  password: string;
  remember_me: boolean;
}

export const loginCustomer = async (payload: LoginPayload) => {
  const response = await api.post("/api/admin/login/", payload);
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await api.post("/api/admin/forgot-password/", { email });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const message = err.response?.data?.message ?? "Failed to send reset email";
    throw new Error(message);
  }
};

export const resetPassword = async (payload: {
  token: string;
  new_password: string;
  confirm_password: string;
}) => {
  const response = await api.post(`/api/admin/reset-password/${payload.token}/`, {
    token: payload.token,
    new_password: payload.new_password,
    confirm_password: payload.confirm_password,
  });
  return response.data;
};
