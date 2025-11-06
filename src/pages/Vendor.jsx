import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Edit, Trash2 } from "lucide-react";

function Vendor() {
  const navigate = useNavigate();

  // Hardcoded sample vendor data (replace later with backend)
  const vendors = [
    {
      _id: "1",
      itemName: "Apples",
      vendorName: "FreshFarms Ltd",
      datePurchase: "2025-08-01",
      dateExpiry: "2025-09-01",
      cost: "₹5000",
    },
    {
      _id: "2",
      itemName: "Tomatoes",
      vendorName: "GreenGrowers Pvt",
      datePurchase: "2025-07-20",
      dateExpiry: "2025-08-20",
      cost: "₹3200",
    },
    {
      _id: "3",
      itemName: "Mangoes",
      vendorName: "Tropical Exports",
      datePurchase: "2025-08-15",
      dateExpiry: "2025-09-15",
      cost: "₹7500",
    },
    {
      _id: "4",
      itemName: "Bananas",
      vendorName: "YellowFruit Co",
      datePurchase: "2025-08-10",
      dateExpiry: "2025-08-30",
      cost: "₹2100",
    },
    {
      _id: "5",
      itemName: "Potatoes",
      vendorName: "VeggieMart",
      datePurchase: "2025-07-28",
      dateExpiry: "2025-09-05",
      cost: "₹4500",
    },
  ];

  // Search + Pagination states
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter vendors
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.itemName.toLowerCase().includes(search.toLowerCase()) ||
      vendor.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      vendor.datePurchase.includes(search) ||
      vendor.dateExpiry.includes(search) ||
      vendor.cost.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  const handleDelete = (id) => {
    console.log("Delete vendor with id:", id);
    // TODO: Replace with actual API delete call
  };

  return (
    <div className="transition-all flex flex-col duration-300 pr-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-white font-bold">Vendors</h2>
        <button
          onClick={() => navigate("/dashboard/vendor/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          <UserPlus size={20} /> Add Vendor
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 bg-white py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sr. No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Vendor Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date Purchase</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date Expiry</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cost</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentVendors.map((vendor, index) => (
              <tr key={vendor._id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-2">{indexOfFirst + index + 1}</td>
                <td className="px-4 py-2">{vendor.itemName}</td>
                <td className="px-4 py-2">{vendor.vendorName}</td>
                <td className="px-4 py-2">{vendor.datePurchase}</td>
                <td className="px-4 py-2">{vendor.dateExpiry}</td>
                <td className="px-4 py-2">{vendor.cost}</td>
                <td className="px-4 py-2 flex justify-center gap-3">
                  <Edit
                    size={18}
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/vendor/edit/${vendor._id}`);
                    }}
                  />
                  <Trash2
                    size={18}
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(vendor._id);
                    }}
                  />
                </td>
              </tr>
            ))}
            {filteredVendors.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Vendor;
