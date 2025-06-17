import React from "react";
import waiting from "../../../assets/waiting-loading.png"

const ResetStepTwo: React.FC = () => {
    return (
        <div className="text-center space-y-4">
            <p className="text-gray-600">
                Please click on the link from the email to reset your <br /> password.
            </p>
            <div className="flex items-center justify-center  mb-6">
                <img src={waiting} alt="Customer Service" className="h-30 w-30" />

            </div>
        </div>
    );
};

export default ResetStepTwo;
