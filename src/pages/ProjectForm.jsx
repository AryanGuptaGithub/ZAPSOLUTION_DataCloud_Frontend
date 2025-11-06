// frontend/src/pages/ProjectForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    companyName: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // later you can send formData to backend
    navigate("/dashboard/projects");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="  bg-[#CFBAFF] rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Add Details</h1>

        {/* Form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label className="block mb-2 font-medium">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block mb-2 font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-2 font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
