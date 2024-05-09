import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React from "react";
//import axios from "axios";

function Dashboard({ user }) {
  
  return (
    <div>
      <h1>welcome to your dashboard</h1>
      <Link to="/viewInfo" className="px-2 text-white">
        <button>My Bio</button>
      </Link>
      <Link to="/prod_ins" className="px-2 text-white">
        <button>Sell product</button>
      </Link>
      <Link to="/viewProducts" className="px-2 text-white">
        <button>Previous Purchases</button>
      </Link>
      <Link to="/viewCart" className="px-2 text-white">
        <button>Cart</button>
      </Link>
      {console.log("user"+user)}
    </div>
  );
}
export default Dashboard;
