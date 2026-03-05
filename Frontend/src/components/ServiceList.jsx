import { useEffect, useState } from "react";
import API from "../services/api";

export default function ServiceList() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const res = await API.get("/services");
    setServices(res.data.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this service?")) {
      await API.delete(`/services/${id}`);
      fetchServices();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Services</h2>
      <div className="space-y-4">
        {services.map((s) => (
          <div
            key={s._id}
            className="border p-4 rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold">{s.title}</h3>
              <p>{s.description}</p>
              <p>Price: ₹{s.price}</p>
              <p>Provider: {s.provider.fullName}</p>
            </div>
            <button
              onClick={() => handleDelete(s._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
