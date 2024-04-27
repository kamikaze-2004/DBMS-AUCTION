import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "/Users/amvis/Desktop/DBMS-Auction/DBMS-AUCTION/aucsite/src/styles/login.css"; // Assuming you have your custom styles in this file

function Login() {
  const [formData, SetFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );
      if(response.status===200)
      {
        window.location.href="http://localhost:3000";
      }
      console.log("User logged-in successfully:", response.data);
      alert("login successfull "+formData.username);
    } catch (err) {
      alert("login unsuccessfull.Try again"+formData.username);
      console.error("Error logging in user:", err);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 mx-auto w-75 ">
        <div className="col-md-6">
          <div className="card ">
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
                    className="form-control "
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
                {/* <Link to="/"> */}
                <button
                  type="submit"
                  className="btn btn-primary mr-3 pl-3 m-50 w-25 left-0"
                >
                  login
                </button>
                {/* </Link> */}
                <Link to="/register">
                  <button
                    type="submit"
                    className="btn btn-primary mx-5 pl-5 m-50"
                  >
                    Register
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
