import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
//import '/Users/amvis/Desktop/DBMS-Auction/DBMS-AUCTION/aucsite/src/login.css'; // Assuming you have your custom styles in this file

function Register() {
  const [formData, SetFormData] = useState({
    username: "",
    email: "",
    password: "",
      });

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
      const response = await axios.post("http://localhost:3001/user/register", formData);
      console.log("User registered successfully:", response.data);
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };
  return (
    <div className="containter-fluid  bg-light text-dark">
      <h1 className="text-black text-center">Register</h1>
      <form
        className="row justify-content-center mt-3 w-50 text-start formwidth"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label htmlFor="inputUserName">Username</label>
          <input
            type="text"
            className="form-control w-50"
            id="inputUserName"
            placeholder="UserName"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-row ">
          <div className="form-group col-md-6 mb-3">
            <label
              htmlFor="inputEmail4"
              className="font-weight-bold font-italic"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group ">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-5 w-25 center">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
