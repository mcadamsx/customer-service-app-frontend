import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.jpg';

const InvoicePage = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md p-6 flex flex-col min-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-purple-800">Invoice Preview</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-4 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
          >
            ← Back
          </button>
        </div>

        <div ref={invoiceRef} className="space-y-8 text-sm text-gray-700 flex flex-col flex-grow">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img src={logo} alt="Customer Service" className="h-16 w-auto" />
              <div>
                <h3 className="text-lg font-semibold">Customer Service</h3>
                <p>custom.service@amalitech.com</p>
                <p>+91 00000 00000</p>
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-5xl font-bold text-gray-400">Invoice</h1>
              <p>#AB2324-01</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Billed To:</p>
              <p>Amalitech Customer Service</p>
              <p>Ama Akroma Road 451, Takoradi, Ghana - 61525</p>
              <p>+0 (000) 123-4567</p>
            </div>
            <div className="text-right">
              <p><strong>Invoice Date:</strong> 01.10.2023</p>
              <p><strong>Due Date:</strong> 15.11.2023</p>
              <p className="text-purple-700 font-bold text-xl mt-2">US$ 4,500.00</p>
            </div>
          </div>

          <div className="pt-2">
            <table className="w-full text-left">
              <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2">#</th>
                <th>Title / Description</th>
                <th>Subtotal</th>
              </tr>
              </thead>
              <tbody>
              <tr className="border-b">
                <td className="py-2">1</td>
                <td>
                  <p>Internet</p>
                  <p className="text-xs text-gray-500">01 Jul – 20 Jul</p>
                </td>
                <td>$3,000.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2</td>
                <td>
                  <p>Voice</p>
                  <p className="text-xs text-gray-500">21 Jul – 31 Jul</p>
                </td>
                <td>$1,500.00</td>
              </tr>
              <tr>
                <td colSpan={2} className="text-right font-bold pt-2">Total</td>
                <td className="font-bold pt-2">$4,500.00</td>
              </tr>
              </tbody>
            </table>
            <p className="text-xs mt-2 text-gray-600">Please pay within 15 days of receiving this invoice.</p>
          </div>

          <div className="mt-auto pt-4 text-xs text-gray-600 border-t">
            <p>Thank you for the business!</p>
            <div className="mt-2 flex justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">Payment Info</p>
                <p>Account Name: Business address, City, State, IN – 000 000</p>
              </div>
              <div>
                <p>Bank: ABCD BANK</p>
                <p>SWIFT: ABCDUSBBXXX</p>
              </div>
              <div>
                <p>Account #: 37474892300011</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
