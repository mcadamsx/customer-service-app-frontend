import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import {ChevronDown} from "lucide-react";
import {useState} from "react";

const data = [
    { name: 'Jan', Tablet: 4000, Internet: 2400, Voice: 2400 },
    { name: 'Feb', Tablet: 3000, Internet: 1398, Voice: 2210 },
    { name: 'Mar', Tablet: 2000, Internet: 9800, Voice: 2290 },
    { name: 'Apr', Tablet: 2780, Internet: 3908, Voice: 2000 },
    { name: 'May', Tablet: 1890, Internet: 4800, Voice: 2181 },
    { name: 'Jun', Tablet: 2390, Internet: 3800, Voice: 2500 },
    { name: 'Jul', Tablet: 3490, Internet: 4300, Voice: 2100 },
    { name: 'Aug', Tablet: 6200, Internet: 5200, Voice: 2900 },
    { name: 'Sep', Tablet: 4800, Internet: 6000, Voice: 4400 },
    { name: 'Oct', Tablet: 5100, Internet: 5700, Voice: 6500 },
    { name: 'Nov', Tablet: 4300, Internet: 4900, Voice: 4200 },
    { name: 'Dec', Tablet: 7600, Internet: 4300, Voice: 5000 },
];

const RevenueChart = () => {

const [selectedYear, setSelectedYear] = useState('Year');
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const years = ['2024', '2023', '2022', '2021'];
return (
    <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Analytics</h2>
            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                >
                    {selectedYear}
                    <ChevronDown className="w-4 h-4"/>
                </button>
                {isDropdownOpen && (
                    <div
                        className="absolute right-0 mt-1 w-20 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => {
                                    setSelectedYear(year);
                                    setIsDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 text-left"
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <CartesianGrid vertical={true} horizontal={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                    domain={[0, 10000]}
                    ticks={[0, 2000, 4000, 6000, 8000, 10000]}
                    tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip formatter={(value: number) => `$${value}`} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Line type="monotone" dataKey="Tablet" stroke="#9333EA" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Internet" stroke="#9CA3AF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Voice" stroke="#60A5FA" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

}

export default RevenueChart;
