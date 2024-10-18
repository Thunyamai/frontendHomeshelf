import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddItemPage = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("Sufficient");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { houseID, roomID } = location.state; // รับ houseID และ roomID

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      // ส่งคำขอเพิ่มสินค้าครั้งแรกไปยัง Backend
      const response = await axios.post("http://localhost:8000/api/items", {
        itemName,
        quantity,
        status,
        householdId: houseID,
        roomId: roomID,
      });

      console.log("Item added:", response.data);
      // หลังจากเพิ่มสินค้าเสร็จ นำผู้ใช้ไปที่หน้า Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding item:", error.response.data);
      setErrorMessage(error.response.data.message || "Item addition failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-lg bg-white">
        <div className="card-body">
          <h2 className="text-2xl text-center">Add Item to Room</h2>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleAddItem}>
            <div className="form-control">
              <label className="label">Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="input input-bordered"
                placeholder="Enter Item Name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input input-bordered"
                placeholder="Enter Quantity"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="input input-bordered"
                required
              >
                <option value="Sufficient">Sufficient</option>
                <option value="Near out">Near out</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-full">
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
