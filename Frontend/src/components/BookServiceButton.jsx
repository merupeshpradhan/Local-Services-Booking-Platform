import { toast } from "react-toastify";
import API from "../services/api";

export default function BookServiceButton({ serviceId, onBooked }) {

  const handleBook = async () => {
    try {

      toast.info("Enter address and booking date to continue");

      const address = prompt("Enter your address:");
      const date = prompt("Enter booking date (YYYY-MM-DD):");
      const notes = prompt("Extra notes (optional)");

      if (!address || !date) {
        toast.error("Address and date are required!");
        return;
      }

      await API.post("/bookings", { serviceId, address, date, notes });

      toast.success("Booking created successfully!");
      onBooked();

    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <button
      onClick={handleBook}
      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
    >
      Book Service
    </button>
  );
}