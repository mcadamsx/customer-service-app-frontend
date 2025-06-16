import React from "react";

interface AuthLayoutProps {
    leftContent?: React.ReactNode;
    rightContent: React.ReactNode;
}

const AuthLayout = ({ leftContent, rightContent }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 via-purple-600 p-10 text-white">
                {leftContent}
            </div>
            <div className="flex items-center justify-center bg-white px-6 py-12">
                {rightContent}
            </div>
        </div>
    );
};

export default AuthLayout;