// CustomerForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    customerDesignation: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    gstin: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName) newErrors.customerName = "Customer Name is required";
    if (!formData.companyName) newErrors.companyName = "Company Name is required";
    if (!formData.customerDesignation) newErrors.customerDesignation = "Designation is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.gstin || !/^[0-9A-Z]{15}$/.test(formData.gstin)) newErrors.gstin = "Valid 15-character GSTIN is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard/customer");
      }, 1500);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/customer");
  };

  return (
    <div className="p-6 bg-[#CFBAFF] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">ADD CUSTOMER DETAILS</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Name */}
        <div>
          <label className="block font-medium">Customer Name</label>
          <input
            type="text"
            className="w-full bg-white border p-2 rounded"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          />
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            className="w-full bg-white border p-2 rounded"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
        </div>

        {/* Designation */}
        <div>
          <label className="block font-medium">Designation</label>
          <input
            type="text"
            className="w-full bg-white border p-2 rounded"
            value={formData.customerDesignation}
            onChange={(e) => setFormData({ ...formData, customerDesignation: e.target.value })}
          />
          {errors.customerDesignation && <p className="text-red-500 text-sm">{errors.customerDesignation}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            className="w-full bg-white border p-2 rounded"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block font-medium">City</label>
          <input
            type="text"
            className="w-full border bg-white p-2 rounded"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            className="w-full bg-white border p-2 rounded"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full bg-white border p-2 rounded"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* GSTIN */}
        <div>
          <label className="block font-medium">GSTIN</label>
          <input
            type="text"
            className="w-full bg-white border p-2 rounded"
            value={formData.gstin}
            onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
          />
          {errors.gstin && <p className="text-red-500 text-sm">{errors.gstin}</p>}
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-green-600">Customer Added Successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerForm;
