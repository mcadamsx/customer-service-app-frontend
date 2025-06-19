import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ProgressBar from "../../components/common/ProgressBar";
import Button from "../../components/common/Button";
import StepOne from "../../components/auth/SignUpForms/StepOne.tsx";
import StepTwo from "../../components/auth/SignUpForms/StepTwo.tsx";
import StepThree from "../../components/auth/SignUpForms/StepThree.tsx";
import LoginLeftPanel from "../../components/auth/LeftPanel.tsx";
import AuthLayout from "../../layouts/AuthLayout.tsx";
import Toast from "../../components/common/ToastMessage.tsx";

interface FormData {
    Token: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
    address_1: string;
    address_2: string;
    country: string;
    region: string;
}

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [progress, setProgress] = useState(30);

    const [formData, setFormData] = useState<FormData>({
        Token: '',
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

    // Wrapper functions for step components
    const setStepOneData = (data: { Token: string; name: string; email: string; password: string; confirm_password: string }) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const setStepTwoData = (data: { address_1: string; address_2?: string; region: string; country: string; phone: string; prefix?: string }) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    useEffect(() => {
        if (step === 1) {
            const { name, email, phone, password, confirm_password } = formData;
            const totalFields = 5;
            const filled = [name, email, phone, password, confirm_password].filter(Boolean).length;
            const stepProgress = (filled / totalFields) * 30;
            setProgress(stepProgress);
        }

        if (step === 2) {
            const { address_1, address_2, country, region } = formData;
            const totalFields = 4;
            const filled = [address_1, address_2, country, region].filter(Boolean).length;
            const stepProgress = 30 + (filled / totalFields) * 30;
            setProgress(stepProgress);
        }

        if (step === 3 || isSubmitted) {
            setProgress(100);
        }
    }, [formData, step, isSubmitted]);


    const next = () => {
        if (isStepValid) {
            setStep(step + 1);
            Toast.success("Step completed successfully.");
        } else {
            Toast.error("Please fill all required fields before continuing.");
        }
    };

    const prev = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        if (!isStepValid) {
            Toast.error("Please complete all fields correctly before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("Submitting form data:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setIsSubmitted(true);
            setStep(3);
            Toast.success("Account created successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            Toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        if (isSubmitted && step === 3) return <StepThree />;

        switch (step) {
            case 1:
                return (
                    <StepOne
                        formData={formData}
                        setFormData={setStepOneData}
                        setIsStepValid={setIsStepValid}
                    />
                );
            case 2:
                return (
                    <StepTwo
                        formData={formData}
                        setFormData={setStepTwoData}
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
                    {isSubmitting ? "Submitting..." : (
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

                    <ProgressBar currentStep={progress} />

                    {renderStep()}

                    {step < 3 && (
                        <div className="flex justify-between items-center pt-4">
                            {step > 1 ? (
                                <Button onClick={prev} variant="secondary">
                                    <FaArrowLeft /> Previous
                                </Button>
                            ) : <div />}
                            {renderActionButton()}
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default SignUp;
