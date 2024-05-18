import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React from "react";
//import axios from "axios";

function Dashboard({ user }) {
  
  return (
    <div className="container-fluid bg-light text-center mt-5">
      <h1>welcome to your dashboard</h1>
      <Link to="/viewInfo" className="px-2 text-white">
        <button className="btn btn-primary btn-block mt-2 mb-2">My Bio</button>
      </Link>
      <Link to="/prod_ins" className="px-2 text-white">
        <button className="btn btn-primary btn-block mt-2 mb-2">Sell product</button>
      </Link>
      <Link to="/viewProducts" className="px-2 text-white">
        <button className="btn btn-primary btn-block mt-2 mb-2">Previous Purchases</button>
      </Link>
      <Link to="/viewCart" className="px-2 text-white">
        <button className="btn btn-primary btn-block mt-2 mb-2">Cart</button>
      </Link>
      <Link to="/SoldProduct" className="px-2 text-white">
        <button className="btn btn-primary btn-block mt-2 mb-2">sold_products</button>
      </Link>
      {console.log("user"+user)}
    </div>
  );
}
export default Dashboard;
