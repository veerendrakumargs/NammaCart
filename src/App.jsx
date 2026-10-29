import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./Components/Pages/PageNotFound";
import LandingPage from "./Components/Users/LandingPage";
import UserRegistrationForm from "./Components/Users/UserRegistrationForm";
import AdminPortal from "./Components/Admin/AdminPortal";
import Usersportal from "./Components/Users/Usersportal";
import Cart from "./Components/Pages/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/register" element={<UserRegistrationForm />} />

      <Route path="/adminportal/*" element={<AdminPortal />} />
      <Route path="/users/*" element={<Usersportal />} />

      <Route path="/home" element={<Navigate to="/users/" replace />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
