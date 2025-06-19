import React, { useEffect, useState } from "react";
import Input from "../../common/Inputs.tsx";

type ResetPasswordFormData = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

interface StepOneProps {
  formData: ResetPasswordFormData;
  setFormData: (data: ResetPasswordFormData) => void;
  setIsStepValid: (valid: boolean) => void;
}

const ResetStepOne: React.FC<StepOneProps> = ({ formData, setFormData, setIsStepValid }) => {
  const [touched, setTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  useEffect(() => {
    setIsStepValid(!!formData.email && isEmailValid);
  }, [formData.email, isEmailValid, setIsStepValid]);

  return (
    <div className="space-y-1">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          if (!touched) setTouched(true);
        }}
        required
      />
      {touched && !isEmailValid && (
        <p className="text-sm text-red-600">Please enter a valid email address.</p>
      )}
    </div>
  );
};

export default ResetStepOne;
