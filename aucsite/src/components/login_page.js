import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/tailwind.css"

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/user/login`, formData);
      if (response.status === 200) {
        const { username } = formData;
        document.cookie = `username=${username}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
        setUser(response.data);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Login unsuccessful. Please check your credentials.");
      }
    } catch (err) {
      toast.error("Login unsuccessful. Please try again later.");
      console.error("Error logging in user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-blue-800 p-6 rounded-2xl shadow-md">
        <h1 className="text-white text-center font-bold text-3xl mb-4"><strong>Login</strong></h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-2">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md bg-white text-black"
              id="username"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md bg-white text-black"
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-white text-blue-600 font-semibold hover:scale-110 hover:bg-black transition-transform mb-4"
          >
            Login
          </button>
          <div className="text-center">
            <Link to="/register" className="text-white">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
