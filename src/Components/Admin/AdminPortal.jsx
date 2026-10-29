import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import Products from "../Pages/Products";
import About from "../Pages/About";
import Categories from "../Pages/Categories";
import Deals from "../Pages/Deals";
import Viewmore from "../Pages/Viewmore";
import AddProduct from "../Pages/AddProduct";
import UserRegistrationForm from "../Users/UserRegistrationForm";

import AdminNavbar from "./AdminNavbar";
import RegisteredUsers from "./RegisteredUsers";

const AdminPortal = () => {
  return (
    <>
      <AdminNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Products" element={<Products />} />
        <Route path="Categories" element={<Categories />} />
        <Route path="Deals" element={<Deals />} />
        <Route path="About" element={<About />} />
        <Route path="viewmore/:id" element={<Viewmore />} />
        <Route path="AddProduct" element={<AddProduct />} />
        <Route path="register" element={<UserRegistrationForm />} />
        <Route path="RegisteredUsers" element={<RegisteredUsers />} />
      </Routes>
    </>
  );
};

export default AdminPortal;
