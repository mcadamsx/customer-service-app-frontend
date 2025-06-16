import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ProgressBar from "../../components/common/ProgressBar";
import Button from "../../components/common/Button";
import StepOne from "../../components/auth/SignUpForms/StepOne.tsx";
import StepTwo from "../../components/auth/SignUpForms/StepTwo.tsx";
import StepThree from "../../components/auth/SignUpForms/StepThree.tsx";
import LoginLeftPanel from "../../components/auth/LeftPanel.tsx";
import AuthLayout from "../../layouts/AuthLayout.tsx";

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        address_1: '',
        address_2: '',
        country: '',
        region: '',
    });

    const next = () => {
        if (isStepValid) {
            setStep(step + 1);
            setAlertMessage(""); // clear alert if valid
        } else {
            setAlertMessage("Please fill all required fields correctly before proceeding.");
        }
    };

    const prev = () => {
        if (step > 1) {
            setStep(step - 1);
            setAlertMessage(""); // reset alert on going back
        }
    };

    const handleSubmit = async () => {
        if (!isStepValid) {
            setAlertMessage("Please complete all required fields correctly.");
            return;
        }

        setIsSubmitting(true);
        setAlertMessage("");

        try {
            console.log("Submitting form data:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSubmitted(true);
            setStep(3);
        } catch (error) {
            console.error("Error submitting form:", error);
            setAlertMessage("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        if (isSubmitted && step === 3) {
            return <StepThree />;
        }

        switch (step) {
            case 1:
                return (
                    <StepOne
                        formData={formData}
                        setFormData={setFormData}
                        setIsStepValid={setIsStepValid}
                    />
                );
            case 2:
                return (
                    <StepTwo
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
        if (step === 2) {
            return (
                <Button onClick={handleSubmit} variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                        "Submitting..."
                    ) : (
                        <span className="flex items-center gap-2">Submit <FaArrowRight /></span>
                    )}
                </Button>
            );
        }

        return (
            <Button onClick={next} variant="primary">
                <span className="flex items-center gap-2">Next <FaArrowRight /></span>
            </Button>
        );
    };

    return (
        <AuthLayout
            leftContent={<LoginLeftPanel />}
            rightContent={
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {step === 3 ? "Account created" : "Create an account"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {step === 3
                                ? "Congratulations! Your account has been successfully created."
                                : "Please provide your details to get started"}
                        </p>
                    </div>

                    <ProgressBar currentStep={step} />

                    {renderStep()}

                    {alertMessage && (
                        <div className="text-red-600 text-sm font-medium pt-2">
                            {alertMessage}
                        </div>
                    )}

                    {step < 3 && (
                        <div className="flex justify-between items-center pt-4">
                            {step > 1 ? (
                                <Button onClick={prev} variant="secondary">
                                    <FaArrowLeft /> Previous
                                </Button>
                            ) : (
                                <div />
                            )}
                            {renderActionButton()}
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default SignUp;
