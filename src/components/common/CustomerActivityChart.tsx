import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface ActivityDataEntry {
  name: string;
  activity: number;
}

interface Props {
  data: ActivityDataEntry[];
}

const CustomerActivityChart = ({ data }: Props) => {
  const [selectedYear, setSelectedYear] = useState('Year');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const years = ['2024', '2023', '2022', '2021'];

  const hasData = data.some(entry => entry.activity > 0);

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
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-20 bg-white border border-gray-300 rounded-md shadow-lg z-10">
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

      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={24} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              domain={[0, 'dataMax + 2']}
              allowDecimals={false}
              tickFormatter={(value) => value.toString()}
            />
            <Tooltip formatter={(value: number) => `${value} activity`} />
            <Bar dataKey="activity" fill="#9333EA" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No customer activity data available for this year.
        </div>
      )}
    </div>
  );
};

export default CustomerActivityChart;
