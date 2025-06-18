import React from 'react';
import { useNavigate } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa";
import  CHECK_MARK  from "../../../assets/CHECK_MARK.png";

const StepThree: React.FC = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center text-center space-y-4 py-10">
            <img src={CHECK_MARK} alt="Success" className="w-25 h-25" />
            <p className="text-gray-600">
               Kindly visit your email to verify your account.
            </p>

            <button
                onClick={handleGoToLogin}
                className="mt-4 w-full px-6 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition"
            >
    <span className="flex items-center justify-center gap-2">
        <FaArrowLeft /> Back to Sign In
    </span>
            </button>
        </div>
    );
};

export default StepThree;
