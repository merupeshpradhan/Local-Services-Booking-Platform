import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProviderBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/bookings/${id}/status`, { status });
    fetchBookings();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>

      {bookings.length === 0 && <p>No booking requests</p>}

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 rounded mb-4 shadow">
          <p><b>Service:</b> {b.service.title}</p>
          <p><b>Customer:</b> {b.customer.fullName}</p>
          <p><b>Address:</b> {b.address}</p>
          <p><b>Date:</b> {new Date(b.date).toLocaleDateString()}</p>
          <p><b>Status:</b> {b.status}</p>

          {user.role === "provider" && b.status === "Pending" && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatus(b._id, "Accepted")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(b._id, "Rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}