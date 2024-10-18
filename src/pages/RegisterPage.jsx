import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [householdName, setHouseholdName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ส่งคำขอไปยัง Backend
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          email,
          password,
          householdName,
          rooms: [], // ไม่มีห้องเริ่มต้น ให้ผู้ใช้สร้างเองในขั้นตอนถัดไป
          items: [], // ไม่มีรายกาของใช้เริ่มต้น
        }
      );

      // เก็บ JWT Token ใน localStorage
      localStorage.setItem("token", response.data.accessToken);

      console.log("Register successful:", response.data);
      // หลังจากลงทะเบียนสำเร็จ ไปสร้างห้อง
      navigate("/create-room", { state: { houseID: response.data.houseID } });
    } catch (error) {
      console.error("Error during registration:", error.response.data);
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-lg bg-white">
        <div className="card-body">
          <h2 className="text-2xl text-center">Register to HomeShelf</h2>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Household Name</label>
              <input
                type="text"
                value={householdName}
                onChange={(e) => setHouseholdName(e.target.value)}
                className="input input-bordered"
                placeholder="Enter Household Name"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-full">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  ); 
};

export default RegisterPage;
