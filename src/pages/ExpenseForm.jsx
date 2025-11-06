// frontend/src/pages/ExpenseForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ExpenseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    expense: "",
    date: "",
    remark: "",
    quotation: null,
    invoice: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Form Submitted:", formData);
    navigate("/expense"); // ✅ Navigate to Expense page after save
  };

  const handleCancel = () => {
    navigate("/dashboard/expense"); // ✅ Navigate back to Expense page
  };

  return (
    <div className="flex justify-center py-10 ">
      <div className="w-full max-w-md bg-[#CFBAFF]  shadow-md rounded-xl p-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">
          ADD Details
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Client Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Expense */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Expense</label>
            <input
              type="number"
              name="expense"
              value={formData.expense}
              onChange={handleChange}
              required
              className="p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Remark */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Remark</label>
            <select
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              required
              className="p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Upload Quotation */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Upload Quotation</label>
            <input
              type="file"
              name="quotation"
              onChange={handleChange}
              accept=".pdf,.jpg,.png"
              className="p-2 border bg-white rounded-lg"
            />
          </div>

          {/* Upload Invoice */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Upload Invoice</label>
            <input
              type="file"
              name="invoice"
              onChange={handleChange}
              accept=".pdf,.jpg,.png"
              className="p-2 border bg-white rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
