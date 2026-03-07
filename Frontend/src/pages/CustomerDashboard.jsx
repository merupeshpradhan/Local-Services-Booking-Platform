import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerBookings from "../components/CustomerBookings";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CustomerDashboard() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <Navbar />

      <main className="w-full mx-auto px-6 py-8 pt-24">
        <div className="pt-5 pl-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md"
          >
            Home
          </button>
        </div>
        {user.role === "customer" && (
          <div className="space-y-8">
            <div className="p-6">
              <CustomerBookings />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CustomerDashboard;
