import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data.user);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg border-b border-gray-200">
      <div className="w-full mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage your services and bookings
          </p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="text-right">
            <p className="text-sm sm:text-lg font-semibold text-gray-800">
              Welcome, {user.fullName}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 capitalize">
              Role: {user.role}
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 sm:px-5 sm:py-1.5 rounded-lg font-medium transition-colors duration-200 shadow-md text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
