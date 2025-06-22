import api from "./client.ts"

export interface CustomerRegisterPayload {
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