import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {FaArrowRightLong} from "react-icons/fa6";
import RevenueChart from "../../components/common/RevenueChart.tsx";
import CustomerActivityChart from "../../components/common/CustomerActivityChart.tsx";
import CustomerLocationsDashboard from "../../components/common/CustomerLocationChart.tsx";

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Hello, James </h1>
                <p className="text-gray-500">Here's an overview fo your profile</p>
            </div>


            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="bg-white shadow-md rounded-2xl p-4  items-center gap-4">
                    <div className="border-b border-gray-300 w-full space-y-4 ">
                        <h2 className="text-sm text-gray-600">VERIFIED CUSTOMERS</h2>
                        <div className="space-y-4 flex justify-between">
                            <div>
                                <p className="text-gray-900 text-2xl font-bold">1,204</p>
                            </div>
                            <div className="text-green-600 text-sm flex gap-2 mt-2">
                                <FaArrowUp className="mt-0.5" />{''} +12.34
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 ">
                        <span className="text-purple-900 flex gap-2 hover:underline  font-semibold">View{' '} <FaArrowRightLong className="mt-1"/> </span>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-4  items-center gap-4">
                    <div className="border-b border-gray-300 w-full space-y-4 ">
                        <h2 className="text-sm text-gray-600">New CUSTOMERS</h2>
                        <div className="space-y-4 flex justify-between">
                            <div>
                                <p className="text-gray-900 text-2xl font-bold">1,204</p>
                            </div>
                            <div className="text-red-700 text-sm flex gap-2 mt-2">
                                <FaArrowDown className="mt-0.5" />{''} -12.34
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 ">
                        <span className="text-purple-900 flex gap-2 hover:underline  font-semibold">View{' '} <FaArrowRightLong className="mt-1"/> </span>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-4  items-center gap-4">
                    <div className="border-b border-gray-300 w-full space-y-4 ">
                        <h2 className="text-sm text-gray-600">OPEN TICKETS</h2>
                        <div className="space-y-4 flex justify-between">
                            <div>
                                <p className="text-gray-900 text-2xl font-bold">300</p>
                            </div>
                            <div className="text-green-600 text-sm flex gap-2 mt-2">
                                <FaArrowUp className="mt-0.5" />{''} +12.34
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 ">
                        <span className="text-purple-900 flex gap-2 hover:underline  font-semibold">View{' '} <FaArrowRightLong className="mt-1"/> </span>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-4  items-center gap-4">
                    <div className="border-b border-gray-300 w-full space-y-4 ">
                        <h2 className="text-sm text-gray-600">SUB-ADMINS</h2>
                        <div className="space-y-4 flex justify-between">
                            <div>
                                <p className="text-gray-900 text-2xl font-bold">700</p>
                            </div>
                            <div className="text-green-600 text-sm flex gap-2 mt-2">
                                <FaArrowUp className="mt-0.5" />{''} +12.34
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 ">
                        <span className="text-purple-900 flex gap-2  hover:underline font-semibold">View{' '} <FaArrowRightLong className="mt-1"/> </span>
                    </div>
                </div>
            </div>
            <div>
                <RevenueChart />
                <div className="mt-6 flex space-x-6 justify-between w-full">
                    <CustomerActivityChart />
                    <CustomerLocationsDashboard />
                </div>
            </div>

            {/* Add more sections here like charts, recent activity, etc. */}
        </div>
    );
};

export default AdminDashboard;
