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
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">All Services</h2>

      {/* Edit Form */}
      {editingService && (
        <div className="bg-white p-6 mb-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Edit Service</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
              <input
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingService.title}
                onChange={(e) =>
                  setEditingService({ ...editingService, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <input
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingService.description}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
              <input
                type="number"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingService.price}
                onChange={(e) =>
                  setEditingService({ ...editingService, price: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
              <input
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingService.category}
                onChange={(e) =>
                  setEditingService({ ...editingService, category: e.target.value })
                }
                required
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Update Service
            </button>
          </form>
        </div>
      )}

      {/* Service List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-3">{s.description}</p>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong className="text-green-600">Price:</strong> ₹{s.price}</p>
                <p><strong className="text-purple-600">Category:</strong> {s.category}</p>
                <p><strong className="text-indigo-600">Provider:</strong> {s.provider.fullName}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              {/* Provider Buttons */}
              {user.role === "provider" &&
                user._id === s.provider._id && (
                  <>
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
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