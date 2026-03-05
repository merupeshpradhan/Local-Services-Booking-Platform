import API from "../services/api";

export default function BookServiceButton({ serviceId, onBooked }) {
  const handleBook = async () => {
    try {
      // Prompt customer for address and date
      const address = prompt("Enter your address:");
      const date = prompt("Enter booking date (YYYY-MM-DD):");
      const notes = prompt("Any notes? (optional)");

      if (!address || !date) {
        alert("Address and date are required!");
        return;
      }

      await API.post("/bookings", { serviceId, address, date, notes });
      alert("Booking created successfully!");
      onBooked(); // refresh list if needed
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
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
