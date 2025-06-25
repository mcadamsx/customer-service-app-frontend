import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from "../../components/common/Button";
import AuthLayout from "../../layouts/AuthLayout";
import LoginLeftPanel from "../../components/auth/LeftPanel";
import ResetStepThree from "../../components/auth/ResetPassword/ResetStepThree.tsx";
import ResetStepTwo from "../../components/auth/ResetPassword/ResetStepTwo.tsx";
import ResetStepOne from "../../components/auth/ResetPassword/ResetStepOne.tsx";
import logo from "../../assets/logo.jpg";
import Toast from "../../components/common/ToastMessage.tsx";
import { requestPasswordReset, resetPassword } from "../../api/auth.ts";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setResetToken(token);
      setStep(3);
    }
  }, [searchParams]);

  const next = async () => {
    if (step === 1 && isStepValid) {
      try {
        setIsSubmitting(true);
        const res = await requestPasswordReset(formData.email);
        Toast.success(res.message || "Reset link sent to your email.");
        setStep(2);
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } }, message?: string };
        const message = error?.response?.data?.message || error?.message || "Error sending reset email.";
        Toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    } else if (step === 1 && !isStepValid) {
      Toast.error("Please enter a valid email.");
    } else {
      setStep(step + 1);
    }
  };


  const handleSubmit = async () => {
    if (!isStepValid) {
      Toast.error("Please complete all fields correctly.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        token: resetToken!,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      };

      await resetPassword(payload);

      Toast.success("Password reset successful!");
      navigate("/", { replace: true });
    } catch (error) {
      const axiosError = error as import("axios").AxiosError<{
        confirm_password?: string[];
        new_password?: string[];
        message?: string;
      }>;

      const message =
        axiosError.response?.data?.confirm_password?.[0] ||
        axiosError.response?.data?.new_password?.[0] ||
        axiosError.response?.data?.message ||
        "Something went wrong.";

      Toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ResetStepOne
            formData={formData}
            setFormData={setFormData}
            setIsStepValid={setIsStepValid}
          />
        );
      case 2:
        return <ResetStepTwo />;
      case 3:
        return (
          <ResetStepThree
            formData={formData}
            setFormData={setFormData}
            setIsStepValid={setIsStepValid}
          />
        );
      default:
        return null;
    }
  };

  const renderActionButton = () => {
    if (step === 3) {
      return (
        <div className="w-full justify-center">
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={isSubmitting}
            className="w-full mb-4 flex justify-center items-center"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Return to{" "}
            <Link to="/" className="text-purple-900 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="w-full">
          <Button
            onClick={next}
            variant="primary"
            className="w-full flex justify-center mb-4"
          >
            <span className="flex items-center gap-2">Continue</span>
          </Button>
          <p className="text-center text-sm text-gray-600">
            Return to{" "}
            <Link to="/" className="text-purple-900 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <AuthLayout
      leftContent={<LoginLeftPanel />}
      rightContent={
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img src={logo} alt="Customer Service" className="h-20" />
              <h1 className="text-2xl font-semibold text-purple-900">
                Customer Service
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 2
                ? "Check Your Email"
                : step === 3
                  ? "Set New Password"
                  : "Forgot Password?"}
            </h2>
            <p className="text-sm text-gray-500">
              {step === 2 ? (
                <>
                  We have sent an email with a reset password link to <br />
                  <span className="font-medium text-purple-900">
                    {formData.email}
                  </span>
                </>
              ) : step === 3 ? (
                "Enter your new password."
              ) : (
                "Enter the email address associated with your account and we'll send you a link to reset your password."
              )}
            </p>
          </div>

          {renderStep()}

          <div className="flex justify-end pt-4">{renderActionButton()}</div>
        </div>
      }
    />
  );
};

export default ResetPassword;
