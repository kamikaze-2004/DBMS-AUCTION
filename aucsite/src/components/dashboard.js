import React from "react";
import { Link } from "react-router-dom";
import Loading from "./loading"; // Importing the Loading component

function Dashboard({ user, loading, setLoading }) {
  return (
    <div className="container-fluid bg-light text-center mt-5">
      {/* Conditional rendering for loading */}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>Welcome to your Dashboard</h1>
          <Link to="/viewInfo" className="text-decoration-none">
            <button className="btn btn-primary btn-block mt-2 mb-2">My Bio</button>
          </Link>
          <Link to="/prod_ins" className="text-decoration-none">
            <button className="btn btn-primary btn-block mt-2 mb-2">Sell Product</button>
          </Link>
          <Link to="/viewProducts" className="text-decoration-none">
            <button className="btn btn-primary btn-block mt-2 mb-2">Previous Purchases</button>
          </Link>
          <Link to="/SoldProduct" className="text-decoration-none">
            <button className="btn btn-primary btn-block mt-2 mb-2">Sold Products</button>
          </Link>
          {/* Display user information */}
          <div className="mt-3">
            {user && (
              <div>
                <p>User: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
