// frontend/src/pages/Expense.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function Expense() {
  const navigate = useNavigate();

  // Dummy data
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      customerName: "John Doe",
      amount: 1200,
      date: "2025-08-20",
      remark: "Invoice Uploaded",
      uploaded: "INVOICE",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      amount: 850,
      date: "2025-08-22",
      remark: "Quotation Uploaded",
      uploaded: "QUOTATION",
    },
    {
      id: 3,
      customerName: "Michael Lee",
      amount: 200,
      date: "2025-08-23",
      remark: "Pending Upload",
      uploaded: "-",
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filtered data
  const filteredData = expenses.filter(
    (item) =>
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.amount.toString().includes(search) ||
      item.date.includes(search) ||
      item.remark.toLowerCase().includes(search.toLowerCase()) ||
      item.uploaded.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="p-6">
      {/* Heading + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Expenses</h1>
        <button
          onClick={() => navigate("/dashboard/expense/add")}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          + Add Expense
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Srno</th>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Expenses</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Remark</th>
              <th className="px-4 py-3">Uploaded</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2">{item.customerName}</td>
                  <td className="px-4 py-2 text-red-600 font-semibold">
                    ₹{item.amount}
                  </td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.remark}</td>
                  <td className="px-4 py-2">{item.uploaded}</td>
                  <td className="px-4 py-2 flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Expense;
