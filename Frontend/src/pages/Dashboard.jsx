import { useEffect, useState } from "react";
import API from "../services/api";
import ServiceList from "../components/ServiceList";
import CustomerBookings from "../components/CustomerBookings";
import ProviderBookings from "../components/ProviderBookings";
import AddService from "../components/AddService";
import { useNavigate } from "react-router-dom";

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

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="mb-6">
        <p className="text-lg font-semibold">Welcome, {user.fullName}</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>

      {/* Provider Dashboard */}
      {user.role === "provider" && (
        <>
          <AddService onServiceAdded={fetchUser} />
          <div className="mt-8">
            <ServiceList user={user} />
          </div>
          <div className="mt-8">
            <ProviderBookings user={user} />
          </div>
        </>
      )}

      {/* Customer Dashboard */}
      {user.role === "customer" && (
        <>
          <ServiceList user={user} />
          <div className="mt-8">
            <CustomerBookings />
          </div>
        </>
      )}
    </div>
  );
}
