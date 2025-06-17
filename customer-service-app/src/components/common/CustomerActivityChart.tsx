import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import {ChevronDown} from "lucide-react";
import  {useState} from "react";

const data = [
    { name: 'Jan', activity: 5000 },
    { name: 'Feb', activity: 25000 },
    { name: 'Mar', activity: 48000 },
    { name: 'Apr', activity: 22000 },
    { name: 'May', activity: 41000 },
    { name: 'Jun', activity: 27000 },
    { name: 'Jul', activity: 47000 },
    { name: 'Aug', activity: 12000 },
    { name: 'Sep', activity: 62000 },
    { name: 'Oct', activity: 17000 },
    { name: 'Nov', activity: 29000 },
    { name: 'Dec', activity: 21000 },
];

const CustomerActivityChart = () => {
    const [selectedYear, setSelectedYear] = useState('Year');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const years = ['2024', '2023', '2022', '2021'];

    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Customer Activity</h2>
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

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} barSize={24} margin={{top: 10, right: 30, left: 0, bottom: 30}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis
                        domain={[0, 80000]}
                        ticks={[0, 20000, 40000, 60000, 80000]}
                        tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} units`}/>
                    <Bar dataKey="activity" fill="#9333EA" radius={[8, 8, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomerActivityChart;
