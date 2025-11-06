// frontend/src/pages/Income.jsx
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Income() {
  const navigate = useNavigate();

  // 🔹 Sample state (Replace with API data later)
  const [incomeData, setIncomeData] = useState([
    {
      id: 1,
      customerName: "Mihir Patel",
      advancedReceived: "₹15,000",
      date: "2025-08-26",
      remark: "Advance for project",
      uploaded: "Invoice",
    },
    {
      id: 2,
      customerName: "Ravi Shah",
      advancedReceived: "₹7,500",
      date: "2025-08-20",
      remark: "Quotation approved",
      uploaded: "Quotation",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // 🔹 Filter data by search
  const filteredData = incomeData.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // 🔹 Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-6">
      {/* Heading + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-50">Income Records</h1>
        <button
          onClick={() => navigate("/dashboard/income/add")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={18} /> Add Income
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 bg-white py-2 rounded-lg w-64 focus:ring-2 focus:ring-green-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Srno</th>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Advanced Received</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Remark</th>
              <th className="p-3 text-left">Uploaded</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{indexOfFirstRow + index + 1}</td>
                  <td className="p-3">{item.customerName}</td>
                  <td className="p-3">{item.advancedReceived}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.remark}</td>
                  <td className="p-3">{item.uploaded}</td>
                  <td className="p-3 flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  No records found
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

export default Income;
