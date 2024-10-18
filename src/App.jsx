import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';         // หน้า Login
import RegisterPage from './pages/RegisterPage';   // หน้า Register
import CreateRoomPage from './pages/CreateRoomPage'; // หน้าสร้างห้อง
import Dashboard from './components/Dashboard';    // หน้าหลักแสดงข้อมูล
import AddItemForm from './components/AddItemForm';// ฟอร์มเพิ่มสินค้า
import ItemList from './components/ItemList';      // รายการสินค้า


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar สามารถเพิ่มได้ที่นี่ */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-room" element={<CreateRoomPage />} /> {/* เพิ่มเส้นทางสำหรับการสร้างห้อง */}
          <Route path="/add-item" element={<AddItemForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items" element={<ItemList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
