import { useEffect, useState } from "react";
import API from "../services/api";
import BookServiceButton from "./BookServiceButton";

export default function ServiceList({ user }) {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

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

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await API.put(`/services/${editingService._id}`, editingService);

    setEditingService(null);
    fetchServices();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Services</h2>

      {/* Edit Form */}
      {editingService && (
        <form
          onSubmit={handleUpdate}
          className="border p-4 mb-6 rounded shadow space-y-2"
        >
          <h3 className="font-bold">Edit Service</h3>

          <input
            className="border p-2 w-full"
            value={editingService.title}
            onChange={(e) =>
              setEditingService({ ...editingService, title: e.target.value })
            }
          />

          <input
            className="border p-2 w-full"
            value={editingService.description}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                description: e.target.value,
              })
            }
          />

          <input
            className="border p-2 w-full"
            value={editingService.price}
            onChange={(e) =>
              setEditingService({ ...editingService, price: e.target.value })
            }
          />

          <input
            className="border p-2 w-full"
            value={editingService.category}
            onChange={(e) =>
              setEditingService({ ...editingService, category: e.target.value })
            }
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Service
          </button>
        </form>
      )}

      {/* Service List */}
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
              <p>Category: {s.category}</p>
              <p>Provider: {s.provider.fullName}</p>
            </div>

            <div className="flex gap-2">

              {/* Provider Buttons */}
              {user.role === "provider" &&
                user._id === s.provider._id && (
                  <>
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}

              {/* Customer Button */}
              {user.role === "customer" && (
                <BookServiceButton
                  serviceId={s._id}
                  onBooked={fetchServices}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}