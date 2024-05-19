import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ loading, setLoading }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      console.log("data:", formData);
      const response = await axios.post(
        "http://localhost:3001/user/register",
        formData
      );
      console.log("User registered successfully:", response.data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error registering user:", err);
    } finally {
      setLoading(false); // Set loading to false after the API request is completed
    }
  };

  return (
    <div className="container-fluid bg-light text-dark mt-5">
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
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputEmail4" className="font-weight-bold font-italic">Email</label>
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
        <button type="submit" className="btn btn-primary mb-5 w-25 center">
          {loading ? "Registering..." : "Register"} {/* Conditional button text based on loading state */}
        </button>
      </form>
    </div>
  );
}

export default Register;
