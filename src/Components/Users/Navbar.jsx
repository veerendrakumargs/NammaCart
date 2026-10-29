
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const bool = path.startsWith("/adminportal");

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (bool) {
      navigate(
        query
          ? `/adminportal/Products?search=${encodeURIComponent(query)}`
          : "/adminportal/Products"
      );
    } else {
      navigate(
        query
          ? `/users/Products?search=${encodeURIComponent(query)}`
          : "/users/Products"
      );
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/images/logo.png" alt="NammaCart Logo" />
        <span>
          Namma<span className="logo-highlight">Cart</span>
        </span>
      </Link>

      <div className="links">
        {bool ? (
          <ul>
            <li>
              <NavLink to="/adminportal/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/adminportal/Products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/adminportal/Categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/adminportal/Deals">Deals</NavLink>
            </li>
            <li>
              <NavLink to="/adminportal/About">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/adminportal/AddProduct">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/adminportal/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/">Logout</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        )}
      </div>

      <div className="nav-actions">
        <form className="search-box" onSubmit={handleSearch}>
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>

        <Link to="/cart" className="cart-link" aria-label="Shopping cart">
          🛒
        </Link>

        {!bool && (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
