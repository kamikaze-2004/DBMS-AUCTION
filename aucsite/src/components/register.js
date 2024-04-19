import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
//import '/Users/amvis/Desktop/DBMS-Auction/DBMS-AUCTION/aucsite/src/login.css'; // Assuming you have your custom styles in this file

function Register() {
    return (
      <div className='containter-fluid  bg-light text-dark'>
        <h1 className='text-black text-center'>Register</h1>
    <form className="row justify-content-center mt-3 mx-auto w-75 text-start">
        <div className="form-row ">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputEmail4" className="font-weight-bold font-italic">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputFirstName">FirstName</label>
          <input type="text" className="form-control" id="inputFirstName" placeholder="FirstName"/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputSecondName">SecondName</label>
          <input type="text" className="form-control" id="inputSecondName" placeholder="SecondName"/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputAddress2">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputContact">Contact No</label>
          <input type="tel" className="form-control" id="inputContact" placeholder="(+91) XXXXXXXXXX"/>
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="form-group col-md-4 mb-3">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option value="choose">Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-2 mb-3">
            <label htmlFor="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip"/>
          </div>
        </div>
        <div className="form-group ">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck"/>
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-5 w-25" >Register</button>
      </form>
      </div>
      );
    }

export default Register;
