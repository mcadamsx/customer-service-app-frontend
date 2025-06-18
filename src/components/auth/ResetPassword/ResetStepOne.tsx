import React, { useEffect, useState } from "react";
import Input from "../../common/Inputs.tsx";

interface StepOneProps {
    formData: any;
    setFormData: (data: any) => void;
    setIsStepValid: (valid: boolean) => void;
}

const ResetStepOne: React.FC<StepOneProps> = ({ formData, setFormData, setIsStepValid }) => {
    const [touched, setTouched] = useState(false);

    const isEmailValid = formData.email.includes("@");

    useEffect(() => {
        setIsStepValid(formData.email && isEmailValid);
    }, [formData.email, setIsStepValid]);

    return (
        <div>
            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setTouched(true);
                }}
                required
            />
            {touched && !isEmailValid && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid email.</p>
            )}
        </div>
    );
};

export default ResetStepOne;
