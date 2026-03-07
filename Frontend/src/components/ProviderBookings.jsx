import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProviderBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");

      const providerBookings = res.data.data.filter(
        (b) => b.provider._id === user._id,
      );

      setBookings(providerBookings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete booking
  // const deleteBooking = async (id) => {
  //   if (window.confirm("Delete this booking?")) {
  //     try {
  //       await API.delete(`/bookings/${id}`);
  //       fetchBookings();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case "Requested":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "In-Progress":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Booking Requests
      </h2>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <p className="text-lg text-gray-600">No booking requests yet</p>
        </div>
      )}

      <div className="grid gap-6 sm md:grid-cols-3 lg:grid-cols-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {b.service.title}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong className="text-blue-600">Customer:</strong>{" "}
                  {b.customer.fullName}
                </p>
                <p>
                  <strong className="text-purple-600">Address:</strong>{" "}
                  {b.address}
                </p>
                <p>
                  <strong className="text-indigo-600">Date:</strong>{" "}
                  {new Date(b.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(b.status)}`}
                  >
                    {b.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Requested */}
              {b.status === "Requested" && (
                <>
                  <button
                    onClick={() => updateStatus(b._id, "Confirmed")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex-1"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(b._id, "Cancelled")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex-1"
                  >
                    Reject
                  </button>
                </>
              )}

              {/* Confirmed */}
              {b.status === "Confirmed" && (
                <button
                  onClick={() => updateStatus(b._id, "In-Progress")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full"
                >
                  Start Service
                </button>
              )}

              {/* In Progress */}
              {b.status === "In-Progress" && (
                <button
                  onClick={() => updateStatus(b._id, "Completed")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full"
                >
                  Complete
                </button>
              )}

              {/* Completed */}
              {/* {b.status === "Completed" && (
                <button
                  onClick={() => deleteBooking(b._id)}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full"
                >
                  Delete
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
