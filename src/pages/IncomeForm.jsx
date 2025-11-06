// frontend/src/pages/IncomeForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function IncomeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    income: "",
    date: "",
    remark: "pending",
    quotation: null,
    invoice: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // 🔹 Later integrate with backend API here
    navigate("/dashboard/income");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className=" bg-[#CFBAFF] shadow-lg rounded-xl w-full max-w-md p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Details
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1  md:grid-cols-2 gap-6">
          {/* Customer Name */}
          <div>
            <label className="block text-gray-700 mb-2">Client Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full border bg-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Income */}
          <div>
            <label className="block text-gray-700 mb-2">Income</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              className="w-full border bg-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border bg-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Remark */}
          <div>
            <label className="block text-gray-700 mb-2">Remark</label>
            <select
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="w-full border bg-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Upload Quotation */}
          <div>
            <label className="block text-gray-700 mb-2">Upload Quotation</label>
            <input
              type="file"
              name="quotation"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              className="w-full border bg-white px-3 py-2 rounded-lg"
            />
          </div>

          {/* Upload Invoice */}
          <div>
            <label className="block text-gray-700 mb-2">Upload Invoice</label>
            <input
              type="file"
              name="invoice"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              className="w-full border bg-white px-3 py-2 rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-center gap-7 mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/income")}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncomeForm;
