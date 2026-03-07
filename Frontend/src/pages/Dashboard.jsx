import { useEffect, useState } from "react";
import API from "../services/api";
import ServiceList from "../components/ServiceList";
import AddService from "../components/AddService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
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

  const handleDashboard = () => {
    if (user.role === "provider") {
      navigate("/provider-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <Navbar />

      <div className="max-w-full mx-auto px-6 pt-28">
        <button
          onClick={handleDashboard}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          {user.role === "provider" ? "Booking Requests" : "My Bookings"}
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-full mx-auto py-8 px-6">
        {/* Provider Dashboard */}
        {user.role === "provider" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add New Service
              </h2>
              <AddService onServiceAdded={fetchUser} />
            </div>
            <div className="">
              <ServiceList user={user} />
            </div>
          </div>
        )}

        {/* Customer Dashboard */}
        {user.role === "customer" && (
          <div className="space-y-8">
            <div className="Available Services">
              <ServiceList user={user} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
