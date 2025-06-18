import React, { useState, useRef, useEffect } from 'react';

interface Option {
    label: string;
    value: string;
}

interface SearchableSelectProps {
    label: string;
    name: string;
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
                                                               label,
                                                               name,
                                                               options,
                                                               value,
                                                               onChange,
                                                               required
                                                           }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

    useEffect(() => {
        // Keep searchTerm in sync with selected value label
        setSearchTerm(selectedLabel);
    }, [value]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full relative" ref={dropdownRef}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                required={required}
                type="text"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowOptions(true);
                    if (onChange) onChange(''); // Clear selected value
                }}
                onFocus={() => setShowOptions(true)}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />

            {showOptions && filteredOptions.length > 0 && (
                <ul className="absolute z-10 w-full max-h-48 overflow-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-sm"
                            onClick={() => {
                                if (onChange) onChange(option.value);
                                setSearchTerm(option.label);
                                setShowOptions(false);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchableSelect;
