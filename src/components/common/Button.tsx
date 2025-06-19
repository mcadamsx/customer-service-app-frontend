import React from 'react';

interface ButtonProps {
    text?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           text,
                                           children,
                                           icon,
                                           iconPosition = 'right',
                                           onClick,
                                           type = 'button',
                                           variant = 'primary',
                                           className = '',
                                           disabled = false,
                                       }) => {
    const baseStyle = 'px-4 py-2 rounded font-medium transition duration-200';

    const variants = {
        primary: 'bg-[#65107F] text-white hover:bg-[#4d0e63] disabled:bg-gray-400 disabled:cursor-not-allowed',
        secondary: 'bg-transparent text-[#65107F] border border-[#65107F] hover:bg-[#f7f0fa] disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            <span className="flex items-center gap-2">
                {icon && iconPosition === 'left' && icon}
                {children || text}
                {icon && iconPosition === 'right' && icon}
            </span>
        </button>
    );
};

export default Button;
