import { useEffect, useState } from "react";
import API from "../services/api";

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-4">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="border p-4 rounded shadow">
            <p>
              <strong>Service:</strong> {b.service.title}
            </p>
            <p>
              <strong>Provider:</strong> {b.provider.fullName}
            </p>
            <p>
              <strong>Status:</strong> {b.status}
            </p>
            <p>
              <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Address:</strong> {b.address}
            </p>
            <p>
              <strong>Price:</strong> ₹{b.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
