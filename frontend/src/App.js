import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Login from "./components/Login";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // ✅ Check if user is logged in

  return (
    <Router>
      {isAuthenticated && <Navbar />} {/* ✅ Show Navbar only when logged in */}
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
