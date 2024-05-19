import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setUser, loading, setLoading }) {
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
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post(
        `http://localhost:3001/user/login`,
        formData
      );
      if (response.status === 200) {
        const { username } = formData;
        document.cookie = `username=${username}; expires=${new Date(
          Date.now() + 86400000
        ).toUTCString()}`;
        setUser(response.data);
        toast.success("login successful user");
        //{ onClose:()=> navigate("/dashboard") }

        navigate("/dashboard");
      } else {
        toast.error("login unsuccessful");
      }
    } catch (err) {
      toast.error("login unsuccessful");
      console.error("Error logging in user:", err);
    } finally {
      setLoading(false); // Set loading to false after the API request is completed
    }
  };

  return (
    <div className="container-fluid text-center">
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
                <div className="mx-3">
                  <button
                    type="submit"
                    className="block btn btn-primary rounded-pill px-5 m-2"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
                <div>
                  <button className="mx-1 btn btn-secondary rounded-pill px-5">
                    <Link
                      to="/register"
                      className="text-light text-decoration-none"
                    >
                      Register
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
