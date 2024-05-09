import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login({ setUser, user }) {
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
      const response = await axios.post(
        `http://localhost:3001/user/login`,
        formData
      );
      if (response.status === 200) {
        console.log(response.data);
        setUser(response.data); // Set the user state with the received user object
        toast.success("login successful ", { onClose:()=> navigate("/dashboard") });
        //navigate(`/dashboard`); // Redirect to the dashboard route
      } else {
        toast.error("login unsuccessful");
      }
    } catch (err) {
      toast.error("login unsuccessful");
      console.error("Error logging in user:", err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 mx-auto w-75">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form
                onSubmit={handleSubmit}
                className="row justify-content-center mt-3 mx-auto w-75 text-start"
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mr-3 mb-2"
                  onClick={handleChange}
                >
                  Login
                </button>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
