import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
//import '/Users/amvis/Desktop/DBMS-Auction/DBMS-AUCTION/aucsite/src/login.css'; // Assuming you have your custom styles in this file

function UserUpdate({ user }) {
  const [formData, SetFormData] = useState({
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
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
      const response = await axios.post(
        "http://localhost:3001/user/userUpdate",
        formData
      );
      console.log("User updated successfully:", response.data);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
  return (
    <div className="containter-fluid  bg-light text-dark">
      <h1 className="text-black text-center">Update Info-{user}</h1>
      <form
        className="row justify-content-center mt-3 mx-auto w-75 text-start"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label htmlFor="inputUserName">Username</label>
          <input
            type="text"
            className="form-control"
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
        <div className="form-group mb-3">
          <label htmlFor="inputFirstName">FirstName</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            placeholder="FirstName"
            value={formData.firstname}
            name="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputLastName">LastName</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="LastName"
            value={formData.lastname}
            name="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputContact">Contact No</label>
          <input
            type="tel"
            className="form-control"
            id="inputContact"
            placeholder="(+91) XXXXXXXXXX"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            value={formData.address}
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputAddress2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={formData.address2}
            name="address2"
            onChange={handleChange}
          />
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputCity">City</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              value={formData.city}
              name="city"
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4 mb-3">
            <label htmlFor="inputState">State</label>
            <input
              type="text"
              className="form-control"
              id="inputState"
              value={formData.state}
              name="state"
              onChange={handleChange}
            ></input>
            {/* <select id="inputState" className="form-control">
              <option value="choose">Choose...</option>
              <option>...</option>
            </select> */}
          </div>
          <div className="form-group col-md-2 mb-3">
            <label htmlFor="inputZip">Zip</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={formData.zipcode}
              name="zipcode"
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
        <button type="submit" className="btn btn-primary mb-5 w-25">
          Register
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;
