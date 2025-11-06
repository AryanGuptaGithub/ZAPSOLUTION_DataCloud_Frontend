import React from "react";
import { Outlet, NavLink, useOutletContext } from "react-router-dom";

function Customer() {
  // get context from Dashboard
  const context = useOutletContext();  

  return (
    <div className="flex justify-start items-center flex-col">
      <h1 className="text-2xl text-center text-white font-bold mb-4">Customer Section</h1>

      {/* Optional: navigation for nested routes */}
      <nav className="flex space-x-9 mb-4">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `flex items-center justify-center transition-all duration-300
             w-full md:w-11/12 lg:w-full
             px-4 py-3
             rounded-full
             cursor-pointer
             ${
               isActive
                 ? "bg-[#CFBAFF] px-15 text-[#000000] shadow-[0_5px_2px_rgba(187,170,225,1)] border border-[#1A1C2B]"
                 : "text-gray-300 hover:scale-105 hover:text-[#BBAAE1]"
             }`
          }
        >
          Customer
        </NavLink>

        <NavLink
          to="vendor"
          className={({ isActive }) =>
            `flex items-center justify-center transition-all duration-300
             w-full md:w-11/12 lg:w-full
             px-2
             rounded-full
             cursor-pointer
             ${
               isActive
                 ? "bg-[#CFBAFF] px-15 text-[#000000] shadow-[0_5px_2px_rgba(187,170,225,1)] border border-[#1A1C2B]"
                 : "text-gray-300 hover:scale-105 hover:text-[#BBAAE1]"
             }`
          }
        >
          Vendor
        </NavLink>
      </nav>

      {/* 🔑 Pass Dashboard’s context down to nested routes */}
      <Outlet context={context} />
    </div>
  );
}

export default Customer;
