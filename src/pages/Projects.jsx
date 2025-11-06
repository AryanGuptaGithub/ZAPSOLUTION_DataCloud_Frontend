// Projects.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function Projects() {
  const navigate = useNavigate();

  // Dummy project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "Website Revamp",
      companyName: "ABC Pvt Ltd",
      startDate: "2025-08-01",
      process: "Ongoing",
    },
    {
      id: 2,
      projectName: "Mobile App",
      companyName: "XYZ Ltd",
      startDate: "2025-07-15",
      process: "Pending",
    },
    {
      id: 3,
      projectName: "Ecommerce Store",
      companyName: "ShopNow Inc",
      startDate: "2025-06-20",
      process: "Completed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Search filter
  const filteredProjects = projects.filter(
    (p) =>
      p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.process.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredProjects.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredProjects.length / recordsPerPage);

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-100">Projects</h1>
        <button
          onClick={() => navigate("/dashboard/projects/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border text-left">Sr No</th>
              <th className="p-3 border text-left">Project Name</th>
              <th className="p-3 border text-left">Company Name</th>
              <th className="p-3 border text-left">Start Date</th>
              <th className="p-3 border text-left">Process</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((p, index) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{indexOfFirstRecord + index + 1}</td>
                  <td className="p-3 border">{p.projectName}</td>
                  <td className="p-3 border">{p.companyName}</td>
                  <td className="p-3 border">{p.startDate}</td>
                  <td className="p-3 border">{p.process}</td>
                  <td className="p-3 border text-center flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Projects;
