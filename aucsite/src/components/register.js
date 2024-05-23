import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";



function Register() {

  const [formData, SetFormData] = useState({
    username: "",
    email: "",
    password: "",
      });

      const navigate = useNavigate();
  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
      const response = await axios.post("http://localhost:3001/user/register", formData);
      console.log("User registered successfully:", response.data);
      if(response.status===200)
        {
          navigate("/");
        }
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };
  return (
    <div className="h-[calc(100vh-90.41px)] bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 w-full">
    <div className="w-3/5 max-w-xl mx-auto bg-blue-800  p-4 rounded-2xl">
      <h1 className="text-white text-center text-bold text-3xl  ">Sign up</h1>
      <form 
        className="row justify-content-center mt-3 w-full text-start formwidth mx-auto "
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3 ">
          <label htmlFor="inputUserName">Username</label>
          <input
            type="text"
            className="form-control "
            id="inputUserName"
            placeholder="UserName"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-row ">
          <div className="form-group  mb-3">
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
              pattern="/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/"
              required
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group  mb-3 r">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              // pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
{/*         
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
            */}
        <button type="submit" className="px-4 py-2 rounded-md bg-[#fff] text-blue-600 font-semibold hover:scale-110 hover:bg-black transition-all   mb-2 w-32  ">
         Sign Up
        </button>
      </form>
    </div>
    </div>
  );
}

export default Register;
