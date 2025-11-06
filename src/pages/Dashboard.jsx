// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, Home, User, ChevronLeft, ChevronRight, Settings, ReceiptIndianRupee, ReceiptIndianRupeeIcon, GraduationCap, LucideProjector } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
      const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();
    const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const [dateTime, setDateTime] = useState(new Date());
 const [sidebarCollapsed] = useState();
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { to: "/dashboard/graph", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { to: "/dashboard/customer", label: "Customer-Master", icon: <GraduationCap className="w-5 h-5" /> },
    { to: "/dashboard/income", label: "Income", icon: <ReceiptIndianRupee className="w-5 h-5" /> },
    { to: "/dashboard/expense", label: "Expense", icon: <ReceiptIndianRupeeIcon className="w-5 h-5" /> },
    { to: "/dashboard/projects", label: "Projects", icon: <LucideProjector className="w-5 h-5" /> },
    { to: "/dashboard/credentials", label: "Credentials", icon: <Home className="w-5 h-5" /> },
  ];

  return (
    <div
  className="relative min-h-screen  overflow-y-auto
  [background:radial-gradient(circle_at_bottom,_#BBAAE1_0%,_#8977B3_30%,_#2B2A41_45%,_#1F2134_70%,_#191B2A_100%)]"
>
    <div 
     className="flex h-screen overflow-hidden" 

  >
      {/* Mobile Sidebar */}
  <AnimatePresence>
  {isOpen && (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      exit={{ x: -250 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed md:hidden top-0 left-0 z-50 w-64 h-full 
        bg-gradient-to-b from-[#2B2A41] to-[#191B2A] text-gray-100 shadow-lg flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <Link to="/" className="flex items-center">
          <img
            src="/image 63.png"
            alt="Home"
            className="h-10 w-auto object-cover"
          />
        </Link>
        <button onClick={toggleSidebar}>
          <X className="w-6 h-6 text-gray-300 hover:text-[#BBAAE1]" />
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col items-center space-y-4">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={i}
              to={item.to}
              className={`flex items-center justify-center w-11/12 px-4 py-3 rounded-full transition-all duration-300 cursor-pointer
                ${isActive
                  ? "bg-[#CCC8FF] text-[#000] shadow-[0_5px_2px_rgba(187,170,225,0.5)] border border-gray-700"
                  : "bg-[#2B2A41]/40 text-gray-300 hover:scale-105 hover:shadow-[0_5px_2px_rgba(187,170,225,0.3)] hover:bg-[#BBAAE1]/20 hover:text-[#BBAAE1]"
                }`}
            >
              {item.icon}
              <span className="ml-2 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  )}
</AnimatePresence>
      {/* Desktop Sidebar */}
  <aside
     className={`hidden md:flex flex-col h-full transition-all duration-300
    text-gray-100 shadow-xl
    ${isCollapsed ? "w-20" : "w-64"}
    bg-transparent
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        {!isCollapsed && (
             <Link to="/" className="flex items-center">
      <img
        src="/image 63.png" // replace with your logo path
        alt="Home"
        className=" mx-10 h-15 w-auto object-cover"
      />
    </Link>
        )}
        <button onClick={toggleCollapse} className="ml-auto">
          {isCollapsed ? (
            <ChevronRight className="w-10 h-10 text-gray-400 hover:text-[#BBAAE1]" />
          ) : (
            <ChevronLeft className="w-10 h-10 text-gray-400 hover:text-[#BBAAE1]" />
          )}
        </button>
      </div>

      {/* Nav */}
 <nav className="flex-1 flex flex-col items-center justify-start p-4 space-y-4">
  {navItems.map((item, i) => {
    const isActive = location.pathname === item.to;

    return (
      <Link
        key={i}
        to={item.to}
        className={`flex items-center justify-center transition-all duration-300
          w-full md:w-11/12 lg:w-full
          px-4 py-3
          rounded-full
     
          cursor-pointer
          ${
            isActive
              ? " bg-[#CFBAFF] text-[#000000] shadow-[0_5px_2px_rgba(187,170,225,1)] border-3 border-[#1A1C2B]"
              :  " text-gray-300 hover:scale-105  "
          }
        `}
      >
        {item.icon}
        {!isCollapsed && <span className="ml-2 font-medium">{item.label}</span>}
      </Link>
    );
  })}
</nav>

    </aside>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 
          ${isCollapsed ? "" : ""}`}
      >
        {/* Header */}
     <header
        className="flex items-center justify-between p-4 
          bg-[#2B2A41]/80 backdrop-blur-md border-b border-gray-700 shadow-md"
      >
        {/* Mobile Sidebar Toggle */}
        <button className="md:hidden" onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-200 hover:text-[#BBAAE1]" />
        </button>

        {/* Title + Date Time */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-lg font-semibold text-white">Welcome</h1>
          <span className="text-sm text-[#BBAAE1] animate-pulse">
            {dateTime.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            •{" "}
            {dateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>

        {/* Profile Icon */}
   <div className="flex items-center space-x-4">
      <span className="text-gray-300 hidden sm:inline">Admin</span>
      <button onClick={() => setIsPanelOpen(true)}>
        <User className="w-8 h-8 text-gray-200 hover:text-[#BBAAE1] transition" />
      </button>
    </div>
      </header>

      {/* Side Panel */}
{/* Profile Panel (Dropdown from Top) */}
{/* Profile Panel (Dropdown from Top) */}
<AnimatePresence>
  {isPanelOpen && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
        onClick={() => setIsPanelOpen(false)}
      />

      {/* Dropdown Panel */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-[64px] left-0 w-full bg-[#1F2134] shadow-2xl z-50 
                   p-6 flex flex-row items-center justify-center gap-8 border-b border-gray-700"
      >
        <h2 className="text-lg font-semibold text-white mr-6">Account:</h2>

        <button
          onClick={() => {
            setIsPanelOpen(false);
            navigate("/");
          }}
          className="px-4 py-2 rounded-md bg-[#2B2A41] text-gray-200 hover:bg-[#BBAAE1]/20 hover:text-[#BBAAE1] transition"
        >
          Logout
        </button>
        <button
          onClick={() => {
            setIsPanelOpen(false);
            navigate("/add-business");
          }}
          className="px-4 py-2 rounded-md bg-[#2B2A41] text-gray-200 hover:bg-[#BBAAE1]/20 hover:text-[#BBAAE1] transition"
        >
          Add Business
        </button>
        <button
          onClick={() => {
            setIsPanelOpen(false);
            navigate("/switch-business");
          }}
          className="px-4 py-2 rounded-md bg-[#2B2A41] text-gray-200 hover:bg-[#BBAAE1]/20 hover:text-[#BBAAE1] transition"
        >
          Switch Business
        </button>
        <button
          onClick={() => {
            setIsPanelOpen(false);
            navigate("/edit-business");
          }}
          className="px-4 py-2 rounded-md bg-[#2B2A41] text-gray-200 hover:bg-[#BBAAE1]/20 hover:text-[#BBAAE1] transition"
        >
          Edit Current Business
        </button>
      </motion.div>
    </>
  )}
</AnimatePresence>



        {/* Outlet for pages */}
   {/* <main className="flex-1 p-4 sm:p-6 text-gray-100 overflow-y-auto"> */}
 <main    className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : ""
        }`}>
  <Outlet context={{ sidebarCollapsed: isCollapsed }} />

</main>

      </div>
    </div></div>
  );
}

export default Dashboard;
