import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserPlus, Edit, Trash2 } from "lucide-react";

function CustomerMain() {
  const navigate = useNavigate();
  const { sidebarCollapsed = false } = useOutletContext() || {}; // get sidebar state

  const [customers, setCustomers] = useState([
    {
      _id: "1",
      clientName: "John Doe",
      companyName: "Acme Corp",
      clientDesignation: "Manager",
      companyAddress: "123 Main St, City",
      phone: "1234567890",
      email: "john@example.com",
      gst: "GST12345",
    },
    {
      _id: "2",
      clientName: "Jane Smith",
      companyName: "Beta Ltd",
      clientDesignation: "CEO",
      companyAddress: "456 Elm St, Town",
      phone: "9876543210",
      email: "jane@example.com",
      gst: "GST67890",
    },
    // Add more dummy customers here for testing pagination
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // you can adjust page size later

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    setCustomers(customers.filter((c) => c._id !== id));
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter((c) =>
    Object.values(c).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div
      className={`transition-all flex justify-start flex-col duration-300 pr-6 ${
        sidebarCollapsed ? "ml-0 w-full" : "ml-0 w-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-teal-50 font-bold">Customers</h2>
        <button
          onClick={() => navigate("/dashboard/customer/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          <UserPlus size={20} /> Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm w-64"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page when searching
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sr. No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Client Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Company Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Client Designation</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Company Address</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone No.</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">GST</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCustomers.map((customer, index) => (
              <tr
                key={customer._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/dashboard/customer/${customer._id}`)}
              >
                <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2">{customer.clientName}</td>
                <td className="px-4 py-2">{customer.companyName}</td>
                <td className="px-4 py-2">{customer.clientDesignation}</td>
                <td className="px-4 py-2">{customer.companyAddress}</td>
                <td className="px-4 py-2">{customer.phone}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.gst}</td>
                <td className="px-4 py-2 flex justify-center gap-3">
                  <Edit
                    size={18}
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/customer/edit/${customer._id}`);
                    }}
                  />
                  <Trash2
                    size={18}
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(customer._id);
                    }}
                  />
                </td>
              </tr>
            ))}
            {currentCustomers.length === 0 && (
              <tr>
                <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col justify-center gap-4 items-center mt-4">
        <p className="text-lg text-gray-100">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} entries
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerMain;
