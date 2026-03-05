import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProviderBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");

      const providerBookings = res.data.data.filter(
        (b) => b.provider._id === user._id
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
  const deleteBooking = async (id) => {
    if (window.confirm("Delete this booking?")) {
      try {
        await API.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>

      {bookings.length === 0 && <p>No booking requests</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          className="border p-4 rounded mb-4 shadow bg-white"
        >
          <p>
            <b>Service:</b> {b.service.title}
          </p>

          <p>
            <b>Customer:</b> {b.customer.fullName}
          </p>

          <p>
            <b>Address:</b> {b.address}
          </p>

          <p>
            <b>Date:</b> {new Date(b.date).toLocaleDateString()}
          </p>

          <p>
            <b>Status:</b> {b.status}
          </p>

          <div className="flex gap-2 mt-3">

            {/* Requested */}
            {b.status === "Requested" && (
              <>
                <button
                  onClick={() => updateStatus(b._id, "Confirmed")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(b._id, "Cancelled")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </>
            )}

            {/* Confirmed */}
            {b.status === "Confirmed" && (
              <button
                onClick={() => updateStatus(b._id, "In-Progress")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Start Service
              </button>
            )}

            {/* In Progress */}
            {b.status === "In-Progress" && (
              <button
                onClick={() => updateStatus(b._id, "Completed")}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Complete
              </button>
            )}

            {/* Completed */}
            {b.status === "Completed" && (
              <button
                onClick={() => deleteBooking(b._id)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}