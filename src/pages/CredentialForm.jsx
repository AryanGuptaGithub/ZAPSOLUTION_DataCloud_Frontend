import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function CredentialForm() {
  const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState({
    domain: {
      serviceProvider: "",
      spUrl: "",
      login: "",
      password: "",
      customerId: "",
      customerPassword: "",
      domain: "",
      purchasedOn: "",
      validity: "",
    },
    hosting: {
      serviceProvider: "",
      spUrl: "",
      login: "",
      password: "",
      customerId: "",
      customerPassword: "",
      domain: "",
      purchasedOn: "",
      validity: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // handle input change
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // validation
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((section) => {
      Object.keys(formData[section]).forEach((field) => {
        if (!formData[section][field]) {
          newErrors[`${section}.${field}`] = "This field is required";
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Submitting:", formData);

    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate("/dashboard/credentials");
    }, 1500);
  };

  // cancel
  const handleCancel = () => {
    navigate("/dashboard/credentials");
  };

  return (
       <div className=" flex justify-center">
      <div className="w-full max-w-6xl">
        {/* 🔹 Main Heading */}
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Credentials
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="shadow p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-auto"
          style={{ backgroundColor: "#CFBAFF" }} // 🔹 body color
        >
          {/* Domain Section */}
        <div>
  <h3 className="text-lg ml-45 font-bold mb-4">Domain Details</h3>
  <div className="space-y-4">
    {Object.keys(formData.domain).map((field) => (
      <div key={field} className="flex flex-col">
        {/* Row for Label + Input */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type={
              field.toLowerCase().includes("password")
                ? "password"
                : field.toLowerCase().includes("purchasedon") ||
                  field.toLowerCase().includes("validity")
                ? "date"
                : "text"
            }
            value={formData.domain[field]}
            onChange={(e) =>
              handleChange("domain", field, e.target.value)
            }
            className="flex-1 p-2 border bg-white rounded-2xl focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Error span below */}
        {errors[`domain.${field}`] && (
          <span className="text-red-500 text-sm ml-40">
            {errors[`domain.${field}`]}
          </span>
        )}
      </div>
    ))}
  </div>
</div>

{/* Hosting Section */}
<div>
  <h3 className="text-lg ml-45 font-bold mb-4">Hosting Details</h3>
  <div className="space-y-4">
    {Object.keys(formData.hosting).map((field) => (
      <div key={field} className="flex flex-col">
        {/* Row for Label + Input */}
        <div className="flex items-center gap-4">
          <input
            type={
              field.toLowerCase().includes("password")
                ? "password"
                : field.toLowerCase().includes("purchasedon") ||
                  field.toLowerCase().includes("validity")
                ? "date"
                : "text"
            }
            value={formData.hosting[field]}
            onChange={(e) =>
              handleChange("hosting", field, e.target.value)
            }
            className="flex-1 p-2 border bg-white rounded-2xl focus:ring-2 focus:ring-blue-400"
          />
     <label className="w-40 font-medium  capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
        </div>

        {/* Error span below */}
        {errors[`hosting.${field}`] && (
          <span className="text-red-500 text-sm ml-40">
            {errors[`hosting.${field}`]}
          </span>
        )}
      </div>
    ))}
  </div>
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
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-3">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <h2 className="text-lg font-semibold">Credential Added!</h2>
            <p className="text-gray-600">Redirecting...</p>
          </div>
        </div>
      )}
    </div>

  );
}

export default CredentialForm;
