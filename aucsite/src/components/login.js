import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Link } from 'react-router-dom';
//import '/Users/amvis/Desktop/DBMS-Auction/DBMS-AUCTION/aucsite/src/styles/login.css'; // Assuming you have your custom styles in this file

function Login() {
    return (
        <div className="container">
          <div className="row justify-content-center mt-5 mx-auto w-75 ">
            <div className="col-md-6">
              <div className="card ">
                <div className="card-body">
                  <h2 className="text-center mb-4">Login</h2>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input type="email" className="form-control " id="email" placeholder="Enter email" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control " id="password" placeholder="Password" />
                    </div>
                    <Link to="/"><button type="submit" className="btn btn-primary mr-3 pl-3 m-50">Submit</button></Link>
                    <Link to="/register"><button type="submit" className="btn btn-primary mx-5 pl-5 m-50">Register</button></Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Login;
