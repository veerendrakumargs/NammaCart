import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [formData, setFormData] = useState({email: "",password: ""});
  const naviagte = useNavigate()

  const handleInput = (ele) => {
    let key = ele.target.name;
    let val = ele.target.value;

    setFormData({
      ...formData,
      [key]: val
    });

    // Remove error styling while typing
    ele.target.style.cssText = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { email, password } = formData;

    let credentials = {
      adminEmail: "admin@gmail.com",
      adminpswd: "Admin123"
    };

    const { adminEmail, adminpswd } = credentials;

    const emailInput = e.target.elements.email;
    const passwordInput = e.target.elements.password;
    const errborder = "border: 2px solid red; color: red;";

    if (email === adminEmail) {
      if(password === adminpswd){
        toast.success("Login Success")
        naviagte('/adminportal')
      }
      else{
        emailInput.style.cssText = "";
        passwordInput.style.cssText = errborder
        toast.error("Password is invaild")
      }
    } else{
      passwordInput.style.cssText = ""
      emailInput.style.cssText = errborder;
      toast.error("Email is invaild")
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          onChange={handleInput}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          onChange={handleInput}
        />

        <button>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;