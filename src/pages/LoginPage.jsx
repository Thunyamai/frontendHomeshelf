import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [houseID, setHouseID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ส่งคำขอไปยัง Backend เพื่อเข้าสู่ระบบ
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          houseID,
        }
      );

      // เก็บ JWT Token ใน localStorage
      localStorage.setItem("token", response.data.accessToken);
      
      console.log("Login successful:", response.data);
      // ไป Dashboard หลังจากเข้าสู่ระบบสำเร็จ
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-white rounded-lg">
        <div className="card-body">
          <h2 className="text-3xl text-center text-blue-700 font-bold mb-4">
            Login to HomeShelf
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <p className="text-center text-gray-600 mb-6">
            Enter your House ID to continue
          </p>
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label text-blue-700 font-semibold">
                House ID
              </label>
              <input
                type="text"
                value={houseID}
                onChange={(e) => setHouseID(e.target.value)}
                className="input input-bordered input-primary w-full"
                placeholder="Enter House ID"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold"
            >
              Login
            </button>
          </form>

          {/* ลิงก์สำหรับลงทะเบียนใหม่และลืม House ID */}
          <div className="flex justify-between mt-6">
            <Link to="/register" className="text-blue-700 hover:underline">
              ลงทะเบียนใหม่
            </Link>
            <Link
              to="/forgot-house-id"
              className="text-blue-700 hover:underline"
            >
              ลืม House ID?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
