import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

function Credentials() {
  const navigate = useNavigate();

  // 🔹 Sample hardcoded data for now
  const [data] = useState([
    {
      id: 1,
      customerName: "John Doe",
      domainName: "example.com",
      domainProvider: "GoDaddy",
      domainExpiry: "2025-12-31",
      hostingProvider: "AWS",
      hostingName: "EC2 Server",
      hostingExpiry: "2026-01-15",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      domainName: "mysite.org",
      domainProvider: "Namecheap",
      domainExpiry: "2024-09-12",
      hostingProvider: "Bluehost",
      hostingName: "Shared Hosting",
      hostingExpiry: "2025-03-20",
    },
  ]);

  // 🔹 Search + Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const filteredData = data.filter(
    (item) =>
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.domainName.toLowerCase().includes(search.toLowerCase()) ||
      item.domainProvider.toLowerCase().includes(search.toLowerCase()) ||
      item.hostingProvider.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-white font-bold">Website Credentials</h2>
        <button
          onClick={() => navigate("/dashboard/credentials/add")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          Add Domain
        </button>
      </div>  

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search credentials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Srno</th>
              <th className="p-3 border">Customer Name</th>
              <th className="p-3 border">Domain Name</th>
              <th className="p-3 border">Service Provider (Domain)</th>
              <th className="p-3 border">Domain Expiry</th>
              <th className="p-3 border">Service Provider (Hosting)</th>
              <th className="p-3 border">Hosting Name</th>
              <th className="p-3 border">Hosting Expiry</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="text-center bg-gray-50">
                <td className="p-3 border">{startIndex + index + 1}</td>
                <td className="p-3 border">{item.customerName}</td>
                <td className="p-3 border">{item.domainName}</td>
                <td className="p-3 border">{item.domainProvider}</td>
                <td className="p-3 border">{item.domainExpiry}</td>
                <td className="p-3 border">{item.hostingProvider}</td>
                <td className="p-3 border">{item.hostingName}</td>
                <td className="p-3 border">{item.hostingExpiry}</td>
                <td className="p-3 border flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Credentials;
