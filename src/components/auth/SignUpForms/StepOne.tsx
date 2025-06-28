import React, { useEffect, useState } from "react";
import Input from "../../common/Inputs.tsx";

interface FormData {
  Token: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface StepOneProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  setIsStepValid: (valid: boolean) => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, setFormData, setIsStepValid }) => {
  const [touched, setTouched] = useState({
    password: false,
    confirm_password: false,
  });

  const { name, email, password, confirm_password } = formData;

  const passwordTooShort = password && password.length < 8;
  const passwordsDoNotMatch = password && confirm_password && password !== confirm_password;

  useEffect(() => {
    const isValid =
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirm_password.trim() !== "" &&
      password.length >= 8 &&
      password === confirm_password;

    setIsStepValid(isValid);
  }, [confirm_password, email, formData, name, password, setIsStepValid]);

  return (
    <div className="space-y-4">
      <Input
        label="Registration Token"
        name="Token"
        value={formData.Token}
        onChange={(e) => setFormData({ ...formData, Token: e.target.value })}
        disabled
      />

      <Input
        label="Company Name"
        name="Company_name"
        type="text"
        placeholder="Enter your company name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Email"
        name="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <div>
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Must be at least 8 characters"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            setTouched((prev) => ({ ...prev, password: true }));
          }}
          required
        />
        {touched.password && passwordTooShort && (
          <p className="text-sm text-red-600 mt-1">Password must be at least 8 characters</p>
        )}
      </div>

      <div>
        <Input
          label="Confirm Password"
          name="confirm_password"
          type="password"
          placeholder="Repeat password"
          value={formData.confirm_password}
          onChange={(e) => {
            setFormData({ ...formData, confirm_password: e.target.value });
            setTouched((prev) => ({ ...prev, confirm_password: true }));
          }}
          required
        />
        {touched.confirm_password && passwordsDoNotMatch && (
          <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
        )}
      </div>
    </div>
  );
};

export default StepOne;
