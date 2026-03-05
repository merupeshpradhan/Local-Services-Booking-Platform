import { useEffect, useState } from "react";
import API from "../services/api";
import AddService from "../components/AddService";
import ServiceList from "../components/ServiceList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data.user);
    } catch {
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
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p>Welcome, {user.fullName}</p>
      <p>Role: {user.role}</p>

      {user.role === "provider" && (
        <>
          <AddService onServiceAdded={fetchUser} />
          <ServiceList />
        </>
      )}
    </div>
  );
}
