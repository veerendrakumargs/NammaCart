
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./UserRegistrationForm.css";

const API_URL = "http://localhost:4000/UserDetails";

const UserRegistrationForm = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const errmzg = useRef(null);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    contact: "",
    email: "",
    password: "",
    dob: "",
    place: "",
  });

  const fetchAPI = async () => {
    try {
      const response = await axios.get(API_URL);
      setUserData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Unable to fetch registered users");
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserDetails((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errmzg.current) {
      errmzg.current.innerText = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailInput = userDetails.email.trim().toLowerCase();

    const emailExists = userData.some(
      (user) => (user.email || "").trim().toLowerCase() === emailInput
    );

    if (emailExists) {
      toast.error("Email already exists");

      if (errmzg.current) {
        errmzg.current.innerText = "This email is already registered.";
      }

      return;
    }

    try {
      setLoading(true);

      const { id, ...registrationData } = userDetails;

      await axios.post(API_URL, {
        ...registrationData,
        username: registrationData.username.trim(),
        email: emailInput,
      });

      toast.success("Registration completed successfully!");

      setUserDetails({
        username: "",
        contact: "",
        email: "",
        password: "",
        dob: "",
        place: "",
      });

      if (errmzg.current) {
        errmzg.current.innerText = "";
      }

      await fetchAPI();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nc-register-page">
      <div className="nc-register-banner">
        <div>
          <p className="nc-register-eyebrow">NAMMACART • CUSTOMER PORTAL</p>
          <h1>Create Your Account</h1>
          <p className="nc-register-subtitle">
            Join NammaCart and get ready for a better shopping experience.
          </p>
        </div>

        <button
          type="button"
          className="nc-registered-users-btn"
          onClick={() => navigate("/adminportal/RegisteredUsers")}
        >
          <span>♙</span> Registered Users
          <span>→</span>
        </button>
      </div>

      <div className="nc-register-layout">
        <aside className="nc-register-aside">
          <div className="nc-register-brand-icon">N</div>
          <p className="nc-register-aside-label">WELCOME TO NAMMACART</p>
          <h2>Your next favourite find is just around the corner.</h2>
          <p className="nc-register-aside-text">
            Create an account to join our shopping community.
          </p>

          <div className="nc-register-benefit">
            <span>✓</span>
            <div>
              <strong>Quick registration</strong>
              <p>Complete your details in a few simple steps.</p>
            </div>
          </div>

          <div className="nc-register-benefit">
            <span>✓</span>
            <div>
              <strong>Personalised account</strong>
              <p>Keep your customer information organised.</p>
            </div>
          </div>

          <div className="nc-register-decoration">SHOP • DISCOVER • REPEAT</div>
        </aside>

        <section className="nc-register-form-section">
          <div className="nc-register-form-heading">
            <div>
              <h2>Registration Details</h2>
              <p>Enter your information below to get started.</p>
            </div>
            <span className="nc-register-step">STEP 01</span>
          </div>

          <form onSubmit={handleSubmit} className="nc-register-form">
            <div className="nc-register-fields">
              <label className="nc-register-field">
                <span>Full Name</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                  value={userDetails.username}
                  onChange={handleInput}
                  autoComplete="name"
                  required
                />
              </label>

              <label className="nc-register-field">
                <span>Contact Number</span>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter your phone number"
                  value={userDetails.contact}
                  onChange={handleInput}
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="nc-register-field nc-register-full">
                <span>Email Address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={userDetails.email}
                  onChange={handleInput}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="nc-register-field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={userDetails.password}
                  onChange={handleInput}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>

              <label className="nc-register-field">
                <span>Date of Birth</span>
                <input
                  type="date"
                  name="dob"
                  value={userDetails.dob}
                  onChange={handleInput}
                  autoComplete="bday"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </label>

              <label className="nc-register-field nc-register-full">
                <span>Address / Place</span>
                <input
                  type="text"
                  name="place"
                  placeholder="Enter your address or city"
                  value={userDetails.place}
                  onChange={handleInput}
                  autoComplete="street-address"
                  required
                />
              </label>
            </div>

            <p
              ref={errmzg}
              className="nc-register-error"
              role="alert"
            ></p>

            <div className="nc-register-form-footer">
              <p>
                <span>🔒</span> Your information should be kept secure.
              </p>

              <button
                type="submit"
                className="nc-register-submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <span> →</span>}
              </button>
            </div>
          </form>

          <p className="nc-register-bottom-note">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Login here
            </button>
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
