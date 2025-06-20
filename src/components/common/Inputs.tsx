import React, { useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'search';
  textarea?: boolean;
}

const Input: React.FC<InputProps> = ({
                                       label,
                                       name,
                                       type = 'text',
                                       placeholder,
                                       value,
                                       onChange,
                                       required = false,
                                       disabled = false,
                                       error,
                                       icon,
                                       className = '',
                                       variant = 'default',
                                       textarea = false,
                                     }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const showSearchIcon = variant === 'search';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {(icon || showSearchIcon) && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon || <Search size={18} />}
          </div>
        )}

        {textarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            rows={4}
            className={`w-full px-4 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 transition ${
              icon || showSearchIcon ? 'pl-10' : ''
            }`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`w-full px-4 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 transition
            ${icon || showSearchIcon ? 'pl-10' : ''}
            ${isPassword ? 'pr-10' : ''}`}
          />
        )}

        {isPassword && !textarea && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
