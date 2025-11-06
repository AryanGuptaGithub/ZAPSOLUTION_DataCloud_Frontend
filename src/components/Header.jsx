import React, { useEffect, useState } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
function Header() {
  const [username, setUsername] = useState("User");
  const [theme, setTheme] = useState("light");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/profile`
        );
        setUsername(res.data.username || "User");
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const logout = () => {
    console.log("Logging out...");
  };

  return (
    <header className="w-full p-2 backdrop-blur-md bg-purple-500/20 shadow-lg border-b border-purple-200/20 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left - Branding */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105"
          >
            <img src="/image 63.png" alt="Logo" className="h-25 w-25 " />
          </Link>
        </div>

        {/* Center - Greeting & Time */}
        <div className="text-center">
          <h2 className="text-2xl font-medium text-purple-800 dark:text-purple-100">
            Hello, {username}
          </h2>
          <p className="text-sm text-purple-600 dark:text-purple-300 animate-pulse">
            {currentTime.toLocaleTimeString()} —{" "}
            {currentTime.toLocaleDateString()}
          </p>
        </div>

        {/* Right - Controls */}
        <div className="flex  justify-between space-x-4 text-purple-800 dark:text-purple-100">
          <button
            onClick={toggleTheme}
            className="hover:text-yellow-400 transition"
          >
            {theme === "light" ? <Moon size={30} /> : <Sun size={30} />}
          </button>

          <button onClick={logout} className="hover:text-red-500  transition">
            <LogOut size={30} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
