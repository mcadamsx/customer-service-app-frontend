import React, { useEffect, useState } from "react";
import Input from "../../common/Inputs.tsx";
import Toast from "../../common/ToastMessage.tsx";

interface PasswordFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface StepThreeProps {
  formData: PasswordFormData;
  setFormData: React.Dispatch<React.SetStateAction<PasswordFormData>>;
  setIsStepValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetStepThree: React.FC<StepThreeProps> = ({ formData, setFormData, setIsStepValid }) => {
  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [toastShown, setToastShown] = useState(false);

  const password = formData.newPassword || "";
  const confirmPassword = formData.confirmPassword || "";

  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const allCriteriaPassed = Object.values(checks).every(Boolean);

  useEffect(() => {
    const valid = Boolean(password.length > 0 && passwordsMatch && allCriteriaPassed);
    setIsStepValid(valid);
  }, [password, confirmPassword, passwordsMatch, allCriteriaPassed, setIsStepValid]);

  useEffect(() => {
    if (touched.confirm && confirmPassword && !passwordsMatch && !toastShown) {
      Toast.error("Passwords do not match.");
      setToastShown(true);
    }
    if (passwordsMatch) {
      setToastShown(false);
    }
  }, [touched.confirm, confirmPassword, passwordsMatch, toastShown]);

  const getCriteriaClass = (condition: boolean) =>
    `text-sm ${condition ? "text-green-600" : "text-red-600"}`;

  return (
    <div className="space-y-4">
      <Input
        label="New Password"
        name="new_password"
        type="password"
        placeholder="At least 8 characters"
        value={password}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, newPassword: e.target.value }));
          setTouched((prev) => ({ ...prev, password: true }));
        }}
        required
      />

      {touched.password && (
        <div>
          <p className={getCriteriaClass(checks.length)}>Password must be at least 8 characters.</p>
          <p className={getCriteriaClass(checks.lowercase)}>Include at least one lowercase letter.</p>
          <p className={getCriteriaClass(checks.uppercase)}>Include at least one uppercase letter.</p>
          <p className={getCriteriaClass(checks.number)}>Include at least one number.</p>
          <p className={getCriteriaClass(checks.special)}>Include at least one special character.</p>
        </div>
      )}

      <Input
        label="Confirm New Password"
        name="confirm_password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
          setTouched((prev) => ({ ...prev, confirm: true }));
        }}
        required
      />
    </div>
  );
};

export default ResetStepThree;