import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    address2: "",
    contact: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
      const response = await axios.post(
        "http://localhost:3001/user/register",
        formData
      );
      console.log("User registered successfully:", response.data);
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  return (
    <div className="container-fluid bg-light text-dark">
      <h1 className="text-black text-center">Register</h1>
      <form
        className="row justify-content-center mt-3 mx-auto w-75 text-start"
        onSubmit={handleSubmit}
      >
        {/* Form fields go here */}
        <button type="submit" className="btn btn-primary mb-5 w-25">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;