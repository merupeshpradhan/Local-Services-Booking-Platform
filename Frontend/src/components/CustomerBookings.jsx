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
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Bookings</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {b.service.title}
              </h3>
              <p className="text-gray-600">
                <strong>Provider:</strong> {b.provider.fullName}
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === "confirmed" ? "bg-green-100 text-green-800" : b.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                >
                  {b.status}
                </span>
              </p>
              <p>
                <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Address:</strong> {b.address}
              </p>
              <p className="text-lg font-bold text-green-600">
                <strong>Price:</strong> ₹{b.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
