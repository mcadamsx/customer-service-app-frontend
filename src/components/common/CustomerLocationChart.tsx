import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

interface CustomerLocationData {
    name: string;
    value: number;
    customers: number;
    color: string;
}

interface CustomerLocationsDashboardProps {
    data?: CustomerLocationData[];
    availableYears?: string[];
    defaultYear?: string;
}

const CustomerLocationsDashboard: React.FC<CustomerLocationsDashboardProps> = ({
                                                                                   data: propData,
                                                                                   availableYears = ['2024', '2023', '2022', '2021'],
                                                                                   defaultYear = 'Year'
                                                                               }) => {
    const [selectedYear, setSelectedYear] = useState<string>(defaultYear);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const data: CustomerLocationData[] = propData || [
        { name: 'Ghana', value: 38.6, customers: 17468, color: '#6B46C1' },
        { name: 'Italy', value: 30.8, customers: 13922, color: '#8B5CF6' },
        { name: 'Nigeria', value: 22.5, customers: 10170, color: '#A78BFA' },
        { name: 'South Africa', value: 8.1, customers: 3641, color: '#C4B5FD' }
    ];

    const totalCustomers: number = data.reduce((sum, item) => sum + item.customers, 0);

    const handleYearSelect = (year: string): void => {
        setSelectedYear(year);
        setIsDropdownOpen(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Top Customer Locations</h2>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                        type="button"
                    >
                        {selectedYear}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-20 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {availableYears.map((year: string) => (
                                <button
                                    key={year}
                                    onClick={() => handleYearSelect(year)}
                                    className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 text-left"
                                    type="button"
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-8">
                {/* Donut Chart */}
                <div className="relative w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {data.map((entry: CustomerLocationData, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-gray-600 text-sm font-medium">Customers</span>
                        <span className="text-2xl font-bold text-gray-800">{totalCustomers.toLocaleString()}</span>
                    </div>

                    {/* Ghana Label on Chart */}
                    <div className="absolute top-4 right-8 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        Ghana<br />38.6
                    </div>
                </div>

                {/* Statistics */}
                <div className="flex-1 space-y-4">
                    {data.map((item: CustomerLocationData) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-gray-700 font-medium">{item.name}</span>
                            </div>
                            <span className="text-gray-800 font-semibold">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerLocationsDashboard;

