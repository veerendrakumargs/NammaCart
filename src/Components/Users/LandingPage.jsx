import React, { useState } from "react";
import AdminLogin from "../Admin/AdminLogin";
import UsersLogin from "./UsersLogin";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [bool, setBool] = useState(true);

  const handleBool = () => {
    setBool(!bool);
  };
  return (
    <>
      <div className="landing_page">
        <div className="container">
          <div id="togglebox">
            <div className="toggle">
              <button onClick={handleBool} className={bool ? "" : "right"}>
                {bool ? "Admin" : "User"}
              </button>
            </div>
          </div>
          <div className="loginbox">
            <div className={`flip-card ${bool ? "" : "flipped"}`}>
              <div className="login-face front">
                <AdminLogin />
                <div className="forgotpass">
                  <Link>Forgot Password</Link>
                </div>
              </div>

              <div className="login-face back">
                <UsersLogin />
                <div className="forgotpass">
                  <Link>Forgot Password</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;