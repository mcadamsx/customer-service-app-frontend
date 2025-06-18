import React from 'react';

interface PhoneInputProps {
    label?: string;
    name?: string;
    prefix?: string;
    phone?: string;
    onPrefixChange?: (prefix: string) => void;
    onPhoneChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
}

const countryPrefixes = [
    { label: '🇬🇭 +233', value: '+233' },
    { label: '🇳🇬 +234', value: '+234' },
    { label: '🇨🇮 +225', value: '+225' },
    { label: '🇿🇦 +27', value: '+27' },
    { label: '🇰🇪 +254', value: '+254' },
    { label: '🇺🇬 +256', value: '+256' },
    { label: '🇹🇿 +255', value: '+255' },
];

const PhoneInput: React.FC<PhoneInputProps> = ({
                                                   label = 'Phone Number',
                                                   name = 'phone',
                                                   prefix = '+233',
                                                   phone = '',
                                                   onPrefixChange,
                                                   onPhoneChange,
                                                   required,
                                                   error,
                                               }) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <div className="flex items-center">
                <select
                    value={prefix}
                    onChange={(e) => onPrefixChange?.(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-l-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-700 text-sm"
                >
                    {countryPrefixes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <input
                    id={name}
                    name={name}
                    type="tel"
                    value={phone}
                    onChange={onPhoneChange}
                    required={required}
                    className={`w-full px-4 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-700 transition text-sm`}
                    placeholder="Enter your phone number"
                />
            </div>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default PhoneInput;
