import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { houseID } = location.state; // รับ houseID จาก state ที่ถูกส่งมาจาก RegisterPage

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("token"); // ดึง JWT Token จาก localStorage

      // ส่งคำขอสร้างห้องไปยัง Backend
      const response = await axios.post(
        "http://localhost:8000/api/rooms/add",
        {
          roomName,
          householdId: houseID,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // ส่ง JWT Token ใน header
          },
        }
      );

      console.log("Room created:", response.data);
      // ไปที่หน้าสำหรับเพิ่มสินค้า
      navigate("/add-item", { state: { houseID, roomID: response.data.id } });
    } catch (error) {
      console.error(
        "Error creating room:",
        error.response?.data || error.message
      );
      setErrorMessage(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างห้องใหม่"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-lg bg-white">
        <div className="card-body">
          <h2 className="text-2xl text-center">Create a Room</h2>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleCreateRoom}>
            <div className="form-control">
              <label className="label">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="input input-bordered"
                placeholder="Enter Room Name"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-full">
              Create Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomPage;
