import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";

function VendorForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    serviceProvider: "",
    datePurchase: "",
    dateExpiry: "",
    cost: "",
    invoices: [],
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "invoices") {
      setFormData({ ...formData, invoices: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // validation
  const validate = () => {
    const newErrors = {};
    if (!formData.itemName.trim()) newErrors.itemName = "Item Name is required.";
    if (!formData.serviceProvider.trim())
      newErrors.serviceProvider = "Service Provider Name is required.";
    if (!formData.datePurchase) newErrors.datePurchase = "Purchase Date is required.";
    if (!formData.dateExpiry) newErrors.dateExpiry = "Expiry Date is required.";
    if (
      formData.datePurchase &&
      formData.dateExpiry &&
      new Date(formData.dateExpiry) < new Date(formData.datePurchase)
    ) {
      newErrors.dateExpiry = "Expiry date must be after purchase date.";
    }
    if (!formData.cost) newErrors.cost = "Cost is required.";
    if (formData.cost && formData.cost <= 0) newErrors.cost = "Cost must be positive.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // Simulate API call
    setTimeout(() => {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard/customer/vendor");
      }, 1500);
    }, 800);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-xl bg-[#CFBAFF] p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">ADD VENDOR DETAILS</h2>

        {/* Item Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full border bg-white rounded-md px-3 py-2"
          />
          {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName}</p>}
        </div>

        {/* Service Provider */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Service Provider Name</label>
          <input
            type="text"
            name="serviceProvider"
            value={formData.serviceProvider}
            onChange={handleChange}
            className="w-full border bg-white rounded-md px-3 py-2"
          />
          {errors.serviceProvider && (
            <p className="text-red-500 text-sm">{errors.serviceProvider}</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Date Purchase</label>
            <input
              type="date"
              name="datePurchase"
              value={formData.datePurchase}
              onChange={handleChange}
              className="w-full border bg-white rounded-md px-3 py-2"
            />
            {errors.datePurchase && (
              <p className="text-red-500 text-sm">{errors.datePurchase}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Date Expiry</label>
            <input
              type="date"
              name="dateExpiry"
              value={formData.dateExpiry}
              onChange={handleChange}
              className="w-full border bg-white rounded-md px-3 py-2"
            />
            {errors.dateExpiry && (
              <p className="text-red-500 text-sm">{errors.dateExpiry}</p>
            )}
          </div>
        </div>

        {/* Cost */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full border bg-white rounded-md px-3 py-2"
          />
          {errors.cost && <p className="text-red-500 text-sm">{errors.cost}</p>}
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Vendor Invoices</label>
          <input
            type="file"
            name="invoices"
            multiple
            onChange={handleChange}
            className="w-full border bg-white rounded-md px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/customer/vendor")}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <CheckCircle2 size={40} className="text-green-500 mb-2" />
            <h3 className="text-lg font-semibold">Vendor Added Successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorForm;
