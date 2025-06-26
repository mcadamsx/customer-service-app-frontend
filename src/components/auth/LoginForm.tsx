import React, { useState } from 'react';
import Input from "../common/Inputs";
import Button from "../common/Button";
import logo from "../../assets/logo.jpg";
import { loginCustomer } from "../../api/auth";
import { Link, useNavigate } from 'react-router-dom';
import Toast from "../common/ToastMessage.tsx";

interface LoginResponse {
  message: string;
  access: string;
  refresh: string;
  expires_in: number;
  company_email: string;
  company_name: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_email: "",
    password: "",
    remember_me: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company_email || !formData.password) {
      Toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const data: LoginResponse = await loginCustomer(formData);

      Toast.success(data.message || "Login successful!");

      const storage = formData.remember_me ? localStorage : sessionStorage;
      const expiryTime = Date.now() + data.expires_in * 1000;

      storage.setItem("access_token", data.access);
      storage.setItem("refresh_token", data.refresh);
      storage.setItem("company_email", data.company_email);
      storage.setItem("company_name", data.company_name);
      storage.setItem("token_expiry", expiryTime.toString());

      navigate("/Dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message =
        error?.response?.data?.message || "Login failed. Try again.";
      Toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Customer Service" className="h-20" />
          <h1 className="text-2xl font-semibold text-purple-900">Customer Service</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-gray-500">Please enter your details</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="company_email"
          type="email"
          placeholder="Enter your email"
          value={formData.company_email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="remember_me"
              className="form-checkbox text-purple-900"
              checked={formData.remember_me}
              onChange={handleChange}
            />
            Remember me for 20 days
          </label>
          <Link to="/reset-password" className="text-sm text-purple-900 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full flex items-center justify-center"
          disabled={loading}
        >
          <span className="text-white">{loading ? "Signing in..." : "Sign In"}</span>
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/sign-up-admin" className="text-purple-900 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
